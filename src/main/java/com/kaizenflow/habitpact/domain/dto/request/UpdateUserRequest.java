package com.kaizenflow.habitpact.domain.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(
        @Email(message = "Invalid email format") String email,
        @Size(min = 3, message = "Username must be at least 3 characters long") String username,
        String firstName,
        String lastName) {}
