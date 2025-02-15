package com.kaizenflow.habitpact.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserAuthResponse(
        UserResponse user,
        String token,
        String refreshToken) {}