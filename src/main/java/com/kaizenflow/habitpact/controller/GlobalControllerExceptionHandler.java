package com.kaizenflow.habitpact.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.kaizenflow.habitpact.domain.dto.ApiError;
import com.kaizenflow.habitpact.exception.HabitPactException;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, WebRequest request) {

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

    @ExceptionHandler(HabitPactException.class)
    protected ResponseEntity<ApiError> handleHabitPactException(HabitPactException ex) {
        ApiError apiError = new ApiError();
        apiError.setStatus(ex.getStatus());
        apiError.setMessage(ex.getMessage());
        apiError.setDebugMessage(ex.getLocalizedMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ApiError> handleEntityNotFound(Exception ex) {
        ApiError apiError = new ApiError();
        apiError.setStatus(HttpStatus.BAD_REQUEST);
        apiError.setMessage("UNCAUGHT ERROR");
        // getLocalizedMessage() gets the error message in the locale language
        apiError.setDebugMessage(ex.getLocalizedMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
