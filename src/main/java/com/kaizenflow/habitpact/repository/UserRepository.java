package com.kaizenflow.habitpact.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.kaizenflow.habitpact.domain.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    // Authentication queries
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    // Active users
    List<User> findByActive(boolean active);

    // Registration date queries
    List<User> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    // Combined queries
    Optional<User> findByEmailAndActive(String email, boolean active);

    Optional<User> findByUsernameAndActive(String username, boolean active);

    // Custom queries
    @Query("{ 'email': ?0, 'active': true }")
    Optional<User> findActiveUserByEmail(String email);

    // Statistics
    long countByActive(boolean active);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
