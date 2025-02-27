package com.kaizenflow.habitpact.util.builder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.kaizenflow.habitpact.domain.dto.request.ChangePasswordRequest;
import com.kaizenflow.habitpact.domain.dto.request.CreateUserRequest;
import com.kaizenflow.habitpact.domain.dto.request.UpdateUserRequest;
import com.kaizenflow.habitpact.domain.dto.response.UserResponse;
import com.kaizenflow.habitpact.domain.model.User;

public class UserTestBuilder {
    // Default values as static constants
    public static final String DEFAULT_ID = "550e8400-e29b-41d4-a716-446655440000";
    public static final String DEFAULT_EMAIL = "test@example.com";
    public static final String DEFAULT_USERNAME = "testuser";
    public static final String DEFAULT_ENCODED_PASSWORD = "encodedPassword";
    public static final String DEFAULT_RAW_PASSWORD = "password123";
    public static final String DEFAULT_FIRST_NAME = "Test";
    public static final String DEFAULT_LAST_NAME = "User";
    public static final boolean DEFAULT_ACTIVE = true;
    public static final List<String> DEFAULT_ROLES = List.of("USER");
    public static final LocalDateTime DEFAULT_CREATED_AT = LocalDateTime.of(2024, 1, 1, 12, 0, 0);
    public static final LocalDateTime DEFAULT_UPDATED_AT = LocalDateTime.of(2024, 1, 1, 12, 0, 0);

    // Instance fields
    private String id = DEFAULT_ID;
    private String email = DEFAULT_EMAIL;
    private String username = DEFAULT_USERNAME;
    private String password = DEFAULT_ENCODED_PASSWORD;
    private String rawPassword = DEFAULT_RAW_PASSWORD;
    private String firstName = DEFAULT_FIRST_NAME;
    private String lastName = DEFAULT_LAST_NAME;
    private boolean active = DEFAULT_ACTIVE;
    private List<String> roles = new ArrayList<>(DEFAULT_ROLES);
    private LocalDateTime createdAt = DEFAULT_CREATED_AT;
    private LocalDateTime updatedAt = DEFAULT_UPDATED_AT;

    /** Static factory method to start building a User. */
    public static UserTestBuilder aUser() {
        return new UserTestBuilder();
    }

    /** Builds and returns a User entity with the current builder state. */
    public User build() {
        return User.builder()
                .id(id)
                .email(email)
                .username(username)
                .password(password)
                .firstName(firstName)
                .lastName(lastName)
                .active(active)
                .roles(roles)
                .build();
    }

    /** Builds a CreateUserRequest DTO from the current builder state. */
    public CreateUserRequest buildCreateRequest() {
        return new CreateUserRequest(email, rawPassword, username, firstName, lastName);
    }

    /** Builds an UpdateUserRequest DTO from the current builder state. */
    public UpdateUserRequest buildUpdateRequest() {
        return new UpdateUserRequest(email, username, firstName, lastName);
    }

    /** Builds a ChangePasswordRequest DTO with the specified current and new passwords. */
    public ChangePasswordRequest buildChangePasswordRequest(
            String currentPassword, String newPassword) {
        return new ChangePasswordRequest(currentPassword, newPassword);
    }

    /** Builds a UserResponse DTO from the current builder state. */
    public UserResponse buildUserResponse() {
        return new UserResponse(id, email, username, firstName, lastName, active, createdAt, updatedAt);
    }

    /** Sets the user ID. */
    public UserTestBuilder withId(String id) {
        this.id = id;
        return this;
    }

    /** Sets the user email. */
    public UserTestBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    /** Sets the username. */
    public UserTestBuilder withUsername(String username) {
        this.username = username;
        return this;
    }

    /** Sets the encoded password (as it would be stored in the database). */
    public UserTestBuilder withEncodedPassword(String encodedPassword) {
        this.password = encodedPassword;
        return this;
    }

    /** Sets the raw (unencoded) password. Used for request DTOs. */
    public UserTestBuilder withRawPassword(String rawPassword) {
        this.rawPassword = rawPassword;
        return this;
    }

    /** Sets the user's first name. */
    public UserTestBuilder withFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    /** Sets the user's last name. */
    public UserTestBuilder withLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    /** Sets the user's active status. */
    public UserTestBuilder withActive(boolean active) {
        this.active = active;
        return this;
    }

    /** Sets the user's creation timestamp. */
    public UserTestBuilder withCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    /** Sets the user's last update timestamp. */
    public UserTestBuilder withUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    /** Sets the user's roles. */
    public UserTestBuilder withRoles(List<String> roles) {
        this.roles = new ArrayList<>(roles);
        return this;
    }

    /** Adds a role to the user's roles list. */
    public UserTestBuilder withAdditionalRole(String role) {
        this.roles.add(role);
        return this;
    }

    /** Creates a builder for an admin user with the "ADMIN" role added. */
    public static UserTestBuilder anAdminUser() {
        return aUser().withAdditionalRole("ADMIN");
    }

    /** Creates a builder for an inactive user. */
    public static UserTestBuilder anInactiveUser() {
        return aUser().withActive(false);
    }
}
