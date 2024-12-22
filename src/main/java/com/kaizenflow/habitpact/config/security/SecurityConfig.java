package com.kaizenflow.habitpact.config.security;

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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

/**
 * Spring Security Configuration Class This class defines the core security settings for the
 * application, including: - Authentication configuration - Authorization rules - Security filters -
 * Password encoding - Session management
 */
@Configuration // Marks this as a Spring configuration class
@RequiredArgsConstructor // Generates constructor for final fields
@EnableWebSecurity // Enables Spring Security's web security support
@EnableMethodSecurity // Enables method-level security annotations like @PreAuthorize
public class SecurityConfig {

    // Inject our custom JWT authentication filter
    private final JwtAuthFilter authFilter;

    /**
     * Defines the UserDetailsService for loading user data This service is responsible for retrieving
     * user information from MongoDB and converting it into Spring Security's UserDetails format
     */
    private final MongoUserDetailsService mongoUserDetailsService;

    /**
     * Configures the security filter chain - this is the core security configuration This defines: -
     * Which URLs are protected - Authentication requirements - CSRF settings - Session management -
     * Custom filters
     *
     * @param http The HttpSecurity object to configure
     * @return The built SecurityFilterChain
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // CSRF Configuration
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for REST APIs using JWT

                // URL-based security rules
                .authorizeHttpRequests(
                        auth ->
                                auth
                                        // Public endpoints that don't require authentication
                                        .requestMatchers(
                                                // Authentication endpoints
                                                "/api/v1/auth/register",
                                                "/api/v1/auth/login",
                                                // Swagger/OpenAPI documentation endpoints
                                                "/swagger-ui/**",
                                                "/swagger-ui.html",
                                                "/v3/api-docs/**",
                                                "/swagger-resources/**",
                                                "/webjars/**")
                                        .permitAll()

                                        // Protected API endpoints - require ROLE_USER authority
                                        .requestMatchers(
                                                "/api/v1/users/**", // User management endpoints
                                                "/api/v1/habits/**" // Habit management endpoints
                                                )
                                        .hasAuthority("ROLE_USER")

                                        // Any other request requires authentication
                                        .anyRequest()
                                        .authenticated())

                // Session Management
                .sessionManagement(
                        session ->
                                session
                                        // Configure stateless sessions since we're using JWT
                                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Configure the authentication provider
                .authenticationProvider(authenticationProvider())

                // Add our JWT filter before Spring's authentication filter
                // This ensures JWT processing happens before standard authentication
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)

                // Build the final security configuration
                .build();
    }

    /**
     * Configures the password encoder for secure password handling BCrypt is a strong hashing
     * algorithm suitable for password storage
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the authentication provider This ties together: - User details service (for loading
     * user data) - Password encoder (for validating passwords) The provider handles the actual
     * authentication process
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(mongoUserDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    /**
     * Creates the authentication manager This is the main Spring Security interface for
     * authentication It delegates to the configured AuthenticationProvider
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}
