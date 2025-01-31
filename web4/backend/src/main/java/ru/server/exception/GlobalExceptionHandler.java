package ru.server.exception;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UsernameExistsException.class)
    public ResponseEntity<?> handleUsernameExists(UsernameExistsException e) {
        log.warn("Ошибка регистрации: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleUsernameExists(AuthenticationException e) {
        log.warn("Ошибка аутентификации: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Ошибка аутентификации");
    }

    @ExceptionHandler(RefreshTokenNotFoundException.class)
    public ResponseEntity<?> handleRefreshTokenNotFound(RefreshTokenNotFoundException e) {
        log.warn("Ошибка обновления токена: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Токен не найден");
    }

    @ExceptionHandler(RefreshTokenTimeoutException.class)
    public ResponseEntity<?> handleRefreshTokenTimeout(RefreshTokenTimeoutException e) {
        log.warn("Ошибка обновления токена: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Токен устарел");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValid(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();

        e.getBindingResult().getAllErrors().forEach(error ->
                errors.put(error.getObjectName(), error.getDefaultMessage()));

        log.warn("Ошибки валидации: {}", errors.size());
        errors.forEach((key, value) -> log.warn("{}: {}", key, value));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("ERROR", errors));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleHttpMessageNotReadable(HttpMessageNotReadableException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Сообщение не читабельно");
    }
}
