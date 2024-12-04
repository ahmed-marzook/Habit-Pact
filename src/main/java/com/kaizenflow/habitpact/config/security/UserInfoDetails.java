package com.kaizenflow.habitpact.config.security;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.kaizenflow.habitpact.domain.model.User;

import lombok.Getter;

@Getter
public class UserInfoDetails implements UserDetails {
    private final String userId;
    private final String username;
    private final String password;
    private final List<GrantedAuthority> authorities;

    public UserInfoDetails(User user) {
        this.userId = user.getId();
        this.username = user.getEmail();
        this.password = user.getPassword();
        this.authorities =
                user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // Adding ROLE_ prefix
                        .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
