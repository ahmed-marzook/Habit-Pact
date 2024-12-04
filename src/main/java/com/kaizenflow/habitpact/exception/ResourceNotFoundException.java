package com.kaizenflow.habitpact.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends HabitPactException {
    public ResourceNotFoundException(String resourceName, String fieldName, String fieldValue) {
        super(
                String.format("%s not found with %s: %s", resourceName, fieldName, fieldValue),
                HttpStatus.NOT_FOUND);
    }
}
