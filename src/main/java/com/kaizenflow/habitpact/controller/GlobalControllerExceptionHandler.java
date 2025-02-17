package com.kaizenflow.habitpact.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.kaizenflow.habitpact.domain.dto.ApiError;
import com.kaizenflow.habitpact.exception.HabitPactException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, "Validation error", ex, request);

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(
                        error ->
                                apiError.addFieldError(
                                        error.getObjectName(),
                                        error.getField(),
                                        error.getRejectedValue(),
                                        error.getDefaultMessage()));

        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(BadCredentialsException.class)
    protected ResponseEntity<ApiError> handleBadCredentials(
            BadCredentialsException ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(
                HttpStatus.UNAUTHORIZED,
                "Invalid username or password",
                ex,
                request
        );
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(HabitPactException.class)
    protected ResponseEntity<ApiError> handleHabitPactException(
            HabitPactException ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(ex.getStatus(), ex.getMessage(), ex, request);
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ApiError> handleEntityNotFound(
            Exception ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, "UNCAUGHT ERROR", ex, request);
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
