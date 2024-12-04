package com.kaizenflow.habitpact.config.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kaizenflow.habitpact.domain.model.User;
import com.kaizenflow.habitpact.repository.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * Service responsible for loading user details from MongoDB for Spring Security authentication.
 * This class bridges our MongoDB user storage with Spring Security's authentication system.
 */
@Service // Marks this as a Spring service component for dependency injection
@RequiredArgsConstructor // Lombok annotation that creates a constructor for final fields
public class MongoUserDetailsService implements UserDetailsService {

    // Final field that will be automatically injected through constructor
    private final UserRepository userRepository;

    /**
     * Loads a user's details by their email address for authentication. This method is called by
     * Spring Security during the authentication process when a user attempts to log in.
     *
     * @param email The email address of the user attempting to authenticate
     * @return UserDetails An implementation of UserDetails containing the user's security information
     * @throws UsernameNotFoundException if no user is found with the given email
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Attempt to find the user in MongoDB by their email address
        User user =
                userRepository
                        .findByEmail(email)
                        // If no user is found, throw an exception with a descriptive message
                        .orElseThrow(() -> new UsernameNotFoundException("User not found by email: " + email));

        // Convert our domain User object to Spring Security's UserDetails format
        // This conversion is handled by our custom UserInfoDetails class
        return new UserInfoDetails(user);
    }
}
