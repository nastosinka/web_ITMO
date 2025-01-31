package ru.server.exception;

public class RefreshTokenTimeoutException extends Exception {
    public RefreshTokenTimeoutException(String message) {
        super(message);
    }
}
