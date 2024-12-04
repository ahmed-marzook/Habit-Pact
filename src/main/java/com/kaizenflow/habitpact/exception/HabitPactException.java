package com.kaizenflow.habitpact.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class HabitPactException extends RuntimeException {
    private final HttpStatus status;

    public HabitPactException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
