package ru.server.filter;

import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.server.service.AccessTokenService;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter { //один раз для каждого запроса

    private static final RequestMatcher ignore = new OrRequestMatcher( //сопоставление с url запросами и условиями
            new AntPathRequestMatcher("/auth/**", HttpMethod.GET.name()),
            new AntPathRequestMatcher("/auth/**", HttpMethod.POST.name())
    );

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer";

    private final AccessTokenService accessTokenService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain filterChain
    ) throws ServletException, IOException {

        String requestURL = request.getRequestURL().toString();
        log.info("Получен запрос с url: {}", requestURL);

        final String authHeader = request.getHeader(AUTHORIZATION_HEADER);

        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            log.warn("Токен не найден");
            response.sendError(HttpStatus.FORBIDDEN.value(), "Токен не найден");
            return;
        }

        final String token = authHeader.substring(BEARER_PREFIX.length()).trim();
        log.info("Получен токен: {}", token);

        try {
            accessTokenService.verifyToken(token);
        } catch (JWTVerificationException e) {
            log.warn("Токен не верифицирован: {}", e.getMessage());
            response.sendError(HttpStatus.FORBIDDEN.value(), "Токен не верифицирован");
            return;
        }

        final String username = accessTokenService.extractUsername(token);
        log.info("Получено имя {}", username);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
    }

    @Override
    public boolean shouldNotFilter(@NotNull HttpServletRequest request) {
        return ignore.matches(request);
    }
}
