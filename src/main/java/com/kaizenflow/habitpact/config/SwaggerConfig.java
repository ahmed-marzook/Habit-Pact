package com.kaizenflow.habitpact.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

    @Bean
    OpenAPI customOpenAPI() {
        // Define the JWT security scheme
        SecurityScheme jwtScheme =
                new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP) // We're using HTTP authentication
                        .scheme("bearer") // Bearer authentication scheme
                        .bearerFormat("JWT") // Using JWT tokens
                        .in(SecurityScheme.In.HEADER) // Token is passed in header
                        .name("Authorization"); // Header name

        // Create a security requirement object
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearerAuth");

        // Create the security scheme component
        Components components = new Components().addSecuritySchemes("bearerAuth", jwtScheme);

        // Build the OpenAPI document with security components
        return new OpenAPI()
                .info(
                        new Info()
                                .title("Habit Pact API")
                                .version("V1")
                                .description("API Documentation for Habit Pact application"))
                .addSecurityItem(securityRequirement) // Global security requirement
                .components(components); // Add security components
    }
}
