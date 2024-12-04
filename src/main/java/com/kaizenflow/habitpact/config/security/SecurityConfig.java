package com.kaizenflow.habitpact.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired private JwtAuthFilter authFilter;

    @Bean
    public UserDetailsService userDetailsService() {
        return new MongoUserDetailsService();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Start by configuring the session management and CSRF
        return http.csrf(
                        AbstractHttpConfigurer
                                ::disable) // Disable CSRF since we're using stateless JWT authentication
                .authorizeHttpRequests(
                        auth ->
                                auth
                                        // Authentication endpoints - publicly accessible
                                        .requestMatchers(
                                                "/auth/users/generateToken", // Login endpoint
                                                "/auth/users/create", // Registration endpoint

                                                // OpenAPI documentation endpoints
                                                "/swagger-ui/**",
                                                "/swagger-ui.html",
                                                "/v3/api-docs/**",
                                                "/swagger-resources/**",
                                                "/webjars/**")
                                        .permitAll()

                                        // API endpoints - all require authentication
                                        // Note: We use /** to match all paths under these prefixes, including path
                                        // variables
                                        .requestMatchers(
                                                "/api/users/**", // All user management endpoints
                                                "/api/habits/**" // All habit management endpoints
                                                )
                                        .hasAuthority("ROLE_USER")
                                        .anyRequest()
                                        .authenticated())
                .sessionManagement(
                        session ->
                                session.sessionCreationPolicy(
                                        SessionCreationPolicy.STATELESS) // No session state - we're using JWTs
                        )
                .authenticationProvider(authenticationProvider())

                // The JWT filter must run before Spring's built-in authentication filter
                // This ensures JWT tokens are processed before any other authentication mechanism
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}
