package com.kaizenflow.habitpact.unit.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.kaizenflow.habitpact.configuration.BaseRepositoryTest;
import com.kaizenflow.habitpact.domain.model.User;
import com.kaizenflow.habitpact.repository.UserRepository;
import com.kaizenflow.habitpact.util.builder.UserTestBuilder;

public class UserRepositoryTest extends BaseRepositoryTest {

    @Autowired private UserRepository userRepository;

    @BeforeEach
    public void clearCollections() {
        userRepository.deleteAll();
    }

    @Test
    void testSetup() {
        User user = UserTestBuilder.aUser().build();
        userRepository.save(user);
        assertTrue(userRepository.existsByEmail("test@example.com"));
    }
}
