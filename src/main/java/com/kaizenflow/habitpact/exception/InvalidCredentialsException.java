package com.kaizenflow.habitpact.exception;

import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends HabitPactException {
    public InvalidCredentialsException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }

    // Overloaded constructor if you need to pass a cause
    public InvalidCredentialsException(String message, Throwable cause) {
        super(message, HttpStatus.UNAUTHORIZED);
        initCause(cause);
    }
}
