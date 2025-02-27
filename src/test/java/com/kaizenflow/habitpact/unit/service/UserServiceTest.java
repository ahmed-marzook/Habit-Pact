package com.kaizenflow.habitpact.unit.service;

import static com.kaizenflow.habitpact.util.builder.UserTestBuilder.DEFAULT_ID;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.kaizenflow.habitpact.domain.dto.request.ChangePasswordRequest;
import com.kaizenflow.habitpact.domain.dto.request.CreateUserRequest;
import com.kaizenflow.habitpact.domain.dto.request.UpdateUserRequest;
import com.kaizenflow.habitpact.domain.dto.response.UserResponse;
import com.kaizenflow.habitpact.domain.model.User;
import com.kaizenflow.habitpact.exception.InvalidCredentialsException;
import com.kaizenflow.habitpact.exception.ResourceAlreadyExistsException;
import com.kaizenflow.habitpact.exception.ResourceNotFoundException;
import com.kaizenflow.habitpact.mappers.UserMapper;
import com.kaizenflow.habitpact.repository.UserRepository;
import com.kaizenflow.habitpact.service.UserService;
import com.kaizenflow.habitpact.util.builder.UserTestBuilder;

public class UserServiceTest {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    private UserMapper userMapper;

    private UserService userService;
    private CreateUserRequest createUserRequest;
    private UpdateUserRequest updateUserRequest;
    private User testUser;
    private UserResponse testUserResponse;
    private final String USER_ID = DEFAULT_ID;

    @BeforeEach
    void setUp() {
        this.createUserRequest = UserTestBuilder.aUser().buildCreateRequest();
        this.updateUserRequest = UserTestBuilder.aUser().buildUpdateRequest();
        this.testUser = UserTestBuilder.aUser().build();
        this.testUserResponse = UserTestBuilder.aUser().buildUserResponse();
        this.userRepository = mock(UserRepository.class);
        this.passwordEncoder = mock(PasswordEncoder.class);
        this.userMapper = mock(UserMapper.class);
        this.userService = new UserService(userRepository, passwordEncoder, userMapper);
    }

    @Test
    void createUser_Success() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encoded-password");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(userMapper.userToUserResponse(any(User.class))).thenReturn(testUserResponse);

        // Act
        UserResponse result = userService.createUser(createUserRequest);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(testUserResponse);
        verify(userRepository).existsByEmail(createUserRequest.email());
        verify(userRepository).existsByUsername(createUserRequest.username());
        verify(passwordEncoder).encode(createUserRequest.password());
        verify(userRepository).save(any(User.class));
        verify(userMapper).userToUserResponse(any(User.class));
    }

    @Test
    void createUser_EmailAlreadyExists() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> userService.createUser(createUserRequest))
                .isInstanceOf(ResourceAlreadyExistsException.class)
                .hasMessage("User already exists with email: test@example.com");

        verify(userRepository).existsByEmail(createUserRequest.email());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void createUser_UsernameAlreadyExists() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.existsByUsername(anyString())).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> userService.createUser(createUserRequest))
                .isInstanceOf(ResourceAlreadyExistsException.class)
                .hasMessageContaining("username");

        verify(userRepository).existsByEmail(createUserRequest.email());
        verify(userRepository).existsByUsername(createUserRequest.username());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void changePassword_Success() {
        // Arrange
        ChangePasswordRequest request = new ChangePasswordRequest("currentPass", "newPass");
        testUser.setPassword("new-encoded-password");

        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("currentPass", testUser.getPassword())).thenReturn(true);
        when(passwordEncoder.matches("newPass", testUser.getPassword())).thenReturn(false);
        when(passwordEncoder.encode("newPass")).thenReturn("new-encoded-password");

        // Act
        userService.changePassword(USER_ID, request);

        // Assert
        verify(userRepository).findById(USER_ID);
        verify(passwordEncoder).matches("currentPass", testUser.getPassword());
        verify(passwordEncoder).matches("newPass", testUser.getPassword());
        verify(passwordEncoder).encode("newPass");
        verify(userRepository).save(testUser);
        assertThat(testUser.getPassword()).isEqualTo("new-encoded-password");
    }

    @Test
    void changePassword_UserNotFound() {
        // Arrange
        ChangePasswordRequest request = new ChangePasswordRequest("currentPass", "newPass");
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> userService.changePassword(USER_ID, request))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("User")
                .hasMessageContaining(USER_ID);

        verify(userRepository).findById(USER_ID);
        verify(passwordEncoder, never()).matches(anyString(), anyString());
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void changePassword_IncorrectCurrentPassword() {
        // Arrange
        ChangePasswordRequest request = new ChangePasswordRequest("wrongPass", "newPass");

        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrongPass", testUser.getPassword())).thenReturn(false);

        // Act & Assert
        assertThatThrownBy(() -> userService.changePassword(USER_ID, request))
                .isInstanceOf(InvalidCredentialsException.class)
                .hasMessageContaining("Current password is incorrect");

        verify(userRepository).findById(USER_ID);
        verify(passwordEncoder).matches("wrongPass", testUser.getPassword());
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void changePassword_NewPasswordSameAsCurrent() {
        // Arrange
        ChangePasswordRequest request = new ChangePasswordRequest("currentPass", "currentPass");

        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("currentPass", testUser.getPassword())).thenReturn(true);
        when(passwordEncoder.matches("currentPass", testUser.getPassword())).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> userService.changePassword(USER_ID, request))
                .isInstanceOf(InvalidCredentialsException.class)
                .hasMessageContaining("New password must be different");

        verify(userRepository).findById(USER_ID);
        verify(passwordEncoder, times(2)).matches("currentPass", testUser.getPassword());
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updateUser_Success() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(userRepository.existsByEmail(updateUserRequest.email())).thenReturn(false);
        when(userRepository.existsByUsername(updateUserRequest.username())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(userMapper.userToUserResponse(any(User.class))).thenReturn(testUserResponse);

        // Act
        UserResponse result = userService.updateUser(USER_ID, updateUserRequest);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(testUserResponse);
        verify(userRepository).findById(USER_ID);
        verify(userRepository).save(testUser);
        verify(userMapper).userToUserResponse(testUser);

        assertThat(testUser.getEmail()).isEqualTo(updateUserRequest.email());
        assertThat(testUser.getUsername()).isEqualTo(updateUserRequest.username());
        assertThat(testUser.getFirstName()).isEqualTo(updateUserRequest.firstName());
        assertThat(testUser.getLastName()).isEqualTo(updateUserRequest.lastName());
    }

    @Test
    void updateUser_UserNotFound() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> userService.updateUser(USER_ID, updateUserRequest))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("User")
                .hasMessageContaining(USER_ID);

        verify(userRepository).findById(USER_ID);
        verify(userRepository, never()).existsByEmail(anyString());
        verify(userRepository, never()).existsByUsername(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updateUser_EmailAlreadyExists() {
        // Arrange
        testUser.setEmail("test-updated@email.com");
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(userRepository.existsByEmail(updateUserRequest.email())).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> userService.updateUser(USER_ID, updateUserRequest))
                .isInstanceOf(InvalidCredentialsException.class)
                .hasMessageContaining("Email already exists");

        verify(userRepository).findById(USER_ID);
        verify(userRepository).existsByEmail(updateUserRequest.email());
        verify(userRepository, never()).existsByUsername(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updateUser_UsernameAlreadyExists() {
        // Arrange
        testUser.setUsername("updatedTestUser");
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(userRepository.existsByUsername(updateUserRequest.username())).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> userService.updateUser(USER_ID, updateUserRequest))
                .isInstanceOf(InvalidCredentialsException.class)
                .hasMessageContaining("Username already exists");

        verify(userRepository).findById(USER_ID);
        verify(userRepository).existsByUsername(updateUserRequest.username());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void patchUser_Success() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(userRepository.existsByEmail(updateUserRequest.email())).thenReturn(false);
        when(userRepository.existsByUsername(updateUserRequest.username())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(userMapper.userToUserResponse(any(User.class))).thenReturn(testUserResponse);

        // Act
        UserResponse result = userService.patchUser(USER_ID, updateUserRequest);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(testUserResponse);
        verify(userRepository).findById(USER_ID);
        verify(userRepository).save(testUser);
        verify(userMapper).userToUserResponse(testUser);

        assertThat(testUser.getEmail()).isEqualTo(updateUserRequest.email());
        assertThat(testUser.getUsername()).isEqualTo(updateUserRequest.username());
        assertThat(testUser.getFirstName()).isEqualTo(updateUserRequest.firstName());
        assertThat(testUser.getLastName()).isEqualTo(updateUserRequest.lastName());
    }

    @Test
    void patchUser_PartialUpdate() {
        // Arrange
        UpdateUserRequest partialRequest = new UpdateUserRequest(null, null, "Updated", null);

        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(userMapper.userToUserResponse(any(User.class))).thenReturn(testUserResponse);

        // Act
        UserResponse result = userService.patchUser(USER_ID, partialRequest);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(testUserResponse);
        verify(userRepository).findById(USER_ID);
        verify(userRepository).save(testUser);
        verify(userMapper).userToUserResponse(testUser);

        // Check that only firstName was updated and others remained unchanged
        assertThat(testUser.getEmail()).isEqualTo("test@example.com");
        assertThat(testUser.getUsername()).isEqualTo("testuser");
        assertThat(testUser.getFirstName()).isEqualTo("Updated");
        assertThat(testUser.getLastName()).isEqualTo("User");
    }

    @Test
    void deleteUser_Success() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));

        // Act
        userService.deleteUser(USER_ID);

        // Assert
        verify(userRepository).findById(USER_ID);
        verify(userRepository).save(testUser);
        assertThat(testUser.isActive()).isFalse();
    }

    @Test
    void deleteUser_UserNotFound() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> userService.deleteUser(USER_ID))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("User")
                .hasMessageContaining(USER_ID);

        verify(userRepository).findById(USER_ID);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void getUser_Success() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(userMapper.userToUserResponse(testUser)).thenReturn(testUserResponse);

        // Act
        UserResponse result = userService.getUser(USER_ID);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(testUserResponse);
        verify(userRepository).findById(USER_ID);
        verify(userMapper).userToUserResponse(testUser);
    }

    @Test
    void getUser_UserNotFound() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> userService.getUser(USER_ID))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("User")
                .hasMessageContaining(USER_ID);

        verify(userRepository).findById(USER_ID);
        verify(userMapper, never()).userToUserResponse(any(User.class));
    }
}
