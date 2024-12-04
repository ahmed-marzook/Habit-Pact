package com.kaizenflow.habitpact.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kaizenflow.habitpact.domain.dto.request.CreateUserRequest;
import com.kaizenflow.habitpact.domain.dto.request.UpdateUserRequest;
import com.kaizenflow.habitpact.domain.dto.response.UserResponse;
import com.kaizenflow.habitpact.domain.model.User;
import com.kaizenflow.habitpact.exception.ResourceAlreadyExistsException;
import com.kaizenflow.habitpact.exception.ResourceNotFoundException;
import com.kaizenflow.habitpact.mappers.UserMapper;
import com.kaizenflow.habitpact.repository.UserRepository;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    //    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserResponse createUser(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResourceAlreadyExistsException("User", "email", request.email());
        }
        if (userRepository.existsByUsername(request.username())) {
            throw new ResourceAlreadyExistsException("User", "username", request.username());
        }

        User user =
                User.builder()
                        .email(request.email())
                        //                .password(passwordEncoder.encode(request.password()))
                        .username(request.username())
                        .firstName(request.firstName())
                        .lastName(request.lastName())
                        .active(true)
                        .build();

        return userMapper.userToUserResponse(userRepository.save(user));
    }

    public UserResponse updateUser(String userId, CreateUserRequest request) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Check email uniqueness if changed
        if (!user.getEmail().equals(request.email()) && userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already exists");
        }

        // Check username uniqueness if changed
        if (!user.getUsername().equals(request.username())
                && userRepository.existsByUsername(request.username())) {
            throw new RuntimeException("Username already exists");
        }

        user.setEmail(request.email());
        user.setUsername(request.username());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());

        return userMapper.userToUserResponse(userRepository.save(user));
    }

    public UserResponse patchUser(String userId, UpdateUserRequest request) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Check and update email if provided
        if (request.email() != null) {
            if (!user.getEmail().equals(request.email())
                    && userRepository.existsByEmail(request.email())) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(request.email());
        }

        // Check and update username if provided
        if (request.username() != null) {
            if (!user.getUsername().equals(request.username())
                    && userRepository.existsByUsername(request.username())) {
                throw new RuntimeException("Username already exists");
            }
            user.setUsername(request.username());
        }

        if (request.firstName() != null) {
            user.setFirstName(request.firstName());
        }

        if (request.lastName() != null) {
            user.setLastName(request.lastName());
        }

        return userMapper.userToUserResponse(userRepository.save(user));
    }

    public void deleteUser(String userId) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setActive(false);
        userRepository.save(user);
    }

    public UserResponse getUser(String userId) {
        return userMapper.userToUserResponse(
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId)));
    }
}
