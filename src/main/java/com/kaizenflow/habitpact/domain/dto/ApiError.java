package com.kaizenflow.habitpact.domain.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ApiError {
    private HttpStatus status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime timestamp = LocalDateTime.now();

    private String message;
    private String debugMessage;
    private List<FieldError> fieldErrors;
    private String path;

    public ApiError(HttpStatus status, HttpServletRequest webRequest) {
        this.status = status;
        this.path = webRequest.getRequestURI();
    }

    public ApiError(HttpStatus status, String message, Throwable ex, HttpServletRequest webRequest) {
        this(status, webRequest);
        this.message = message;
        this.debugMessage = ex.getLocalizedMessage();
    }

    public void addFieldError(String object, String field, Object rejectedValue, String message) {
        if (fieldErrors == null) {
            fieldErrors = new ArrayList<>();
        }
        fieldErrors.add(new FieldError(object, field, rejectedValue, message));
    }

    public record FieldError(String object, String field, Object rejectedValue, String message) {}
}
