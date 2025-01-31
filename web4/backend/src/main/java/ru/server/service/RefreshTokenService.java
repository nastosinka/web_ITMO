package ru.server.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.server.repository.RefreshTokenRepository;
import ru.server.entity.RefreshToken;
import ru.server.entity.User;
import ru.server.exception.RefreshTokenNotFoundException;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    @Value("${auth.refreshTokenValidity}")
    private Duration refreshTokenValidity;

    private final RefreshTokenRepository refreshTokenRepository;

    public UUID generateRefreshToken(User user) {
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .issuedAt(Date.from(Instant.now()))
                .expiresAt(Date.from(Instant.now().plus(refreshTokenValidity)))
                .build();
        return refreshTokenRepository
                .save(refreshToken)
                .getId();
    }

    public RefreshToken getRefreshToken(UUID token) throws RefreshTokenNotFoundException {
        return refreshTokenRepository.findById(token)
                .orElseThrow(() -> new RefreshTokenNotFoundException("Токен " + token + " не найден"));
    }

    public boolean isExpired(RefreshToken refreshToken) {
        return refreshToken.getExpiresAt().before(Date.from(Instant.now()));
    }

    public void removeToken(UUID token) {
        refreshTokenRepository.deleteById(token);
    }
}
