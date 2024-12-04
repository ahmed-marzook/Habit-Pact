package com.kaizenflow.habitpact.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.kaizenflow.habitpact.domain.dto.response.UserResponse;
import com.kaizenflow.habitpact.domain.model.User;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
public interface UserMapper {
    UserResponse userToUserResponse(User user);
}
