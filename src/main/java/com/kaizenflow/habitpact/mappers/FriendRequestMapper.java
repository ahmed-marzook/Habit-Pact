package com.kaizenflow.habitpact.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.kaizenflow.habitpact.domain.dto.response.FriendRequestResponse;
import com.kaizenflow.habitpact.domain.model.FriendRequest;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
public interface FriendRequestMapper {

    FriendRequestResponse friendRequestToFriendRequestResponse(FriendRequest friendRequest);
}
