package ru.server.exception;

public class RefreshTokenNotFoundException extends Exception {
    public RefreshTokenNotFoundException(String message) {
        super(message);
    }
}
