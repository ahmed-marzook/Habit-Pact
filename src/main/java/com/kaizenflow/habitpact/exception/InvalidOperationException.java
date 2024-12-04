package com.kaizenflow.habitpact.exception;

import org.springframework.http.HttpStatus;

public class InvalidOperationException extends HabitPactException {
    public InvalidOperationException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
