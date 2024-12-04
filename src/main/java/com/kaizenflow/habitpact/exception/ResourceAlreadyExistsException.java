package com.kaizenflow.habitpact.exception;

import org.springframework.http.HttpStatus;

public class ResourceAlreadyExistsException extends HabitPactException {
    public ResourceAlreadyExistsException(String resourceName, String fieldName, String fieldValue) {
        super(
                String.format("%s already exists with %s: %s", resourceName, fieldName, fieldValue),
                HttpStatus.CONFLICT);
    }
}
