package com.kaizenflow.habitpact.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaizenflow.habitpact.config.security.JwtService;
import com.kaizenflow.habitpact.domain.dto.request.AuthRequest;
import com.kaizenflow.habitpact.domain.dto.request.CreateUserRequest;
import com.kaizenflow.habitpact.domain.dto.response.UserResponse;
import com.kaizenflow.habitpact.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth/users")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {
    private final UserService userService;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                authRequest.username(), authRequest.password()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.username());
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @Operation(
            summary = "Create a new user",
            description = "Creates a new user with the provided information")
    @PostMapping("/create")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }
}
