package com.kaizenflow.habitpact.config.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

/**
 * JWT Authentication Filter that processes and validates JWT tokens for each incoming request. This
 * filter intercepts HTTP requests to validate JWT tokens and establish user authentication. It
 * extends OncePerRequestFilter to ensure the filter is only executed once per request.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    // Service for JWT operations like token validation and data extraction
    private final JwtService jwtService;

    // Service to load user details from MongoDB database
    private final MongoUserDetailsService userDetailsService;

    /**
     * Main filter method that processes each incoming HTTP request. This method: 1. Extracts the JWT
     * token from the Authorization header 2. Validates the token 3. Sets up authentication if the
     * token is valid
     *
     * @param request The incoming HTTP request
     * @param response The HTTP response
     * @param filterChain The filter chain to continue processing
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Initialize variables to store authentication data
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String email = null;

        // Extract the JWT token from the Authorization header
        // The header format should be: "Bearer <token>"
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Remove "Bearer " prefix (first 7 characters) to get the token
            token = authHeader.substring(7);
            // Extract the user's email from the token using JwtService
            email = jwtService.extractEmail(token);
        }

        // Process authentication only if:
        // 1. We successfully extracted an email from the token
        // 2. There's no existing authentication in the SecurityContext
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load the full user details from the database using the email
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            // Validate the token against the user details
            // This typically checks if:
            // - Token hasn't expired
            // - Token was issued to the correct user
            if (jwtService.validateToken(token, userDetails)) {
                // Create an authentication token with:
                // - User details
                // - Null credentials (not needed after authentication)
                // - User authorities/roles
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());

                // Add additional authentication details from the HTTP request
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set the authentication in the SecurityContext
                // This marks the user as authenticated for this request
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue the filter chain regardless of authentication outcome
        // If authentication failed, other security filters will handle the unauthorized request
        filterChain.doFilter(request, response);
    }
}
