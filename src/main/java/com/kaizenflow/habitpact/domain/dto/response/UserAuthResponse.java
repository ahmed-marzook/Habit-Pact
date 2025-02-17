package com.kaizenflow.habitpact.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserAuthResponse(UserResponse user, String token, String refreshToken) {}
