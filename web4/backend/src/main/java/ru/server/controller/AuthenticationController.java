package ru.server.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.server.dto.*;
import ru.server.service.AuthenticationService;
import ru.server.exception.RefreshTokenNotFoundException;
import ru.server.exception.RefreshTokenTimeoutException;
import ru.server.exception.UsernameExistsException;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<CredentialsDTO> register(@Validated @RequestBody RegistrationDTO registrationDTO) throws UsernameExistsException {
        CredentialsDTO credentialsDTO = authenticationService.register(registrationDTO);
        log.info("Успешно зарегистрирован пользователь с ником: {}", registrationDTO.getUsername());
        return ResponseEntity.ok(credentialsDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<CredentialsDTO> logIn(@Validated @RequestBody AuthenticationDTO authenticationDTO) throws AuthenticationException {
        CredentialsDTO credentialsDTO = authenticationService.logIn(authenticationDTO);
        log.info("Успешно аутентифицирован пользователь с ником: {}", authenticationDTO.getUsername());
        return ResponseEntity.ok(credentialsDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logOut(@Validated @RequestBody RefreshTokenDTO refreshTokenDTO) {
        authenticationService.logout(refreshTokenDTO);
        log.info("Прервал сессию пользователь с токеном: {}", refreshTokenDTO.getToken());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AccessTokenDTO> refreshToken(@Validated @RequestBody RefreshTokenDTO refreshTokenDTO) throws RefreshTokenNotFoundException, RefreshTokenTimeoutException {
        AccessTokenDTO newToken = authenticationService.getRefreshedToken(refreshTokenDTO);
        log.info("Токен обновлён успешно: {}\nНовый токен: {}", refreshTokenDTO.getToken(), newToken.getToken());
        return ResponseEntity.ok(newToken);
    }
}
