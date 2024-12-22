package com.kaizenflow.habitpact.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.kaizenflow.habitpact.domain.dto.response.HabitCompletionResponse;
import com.kaizenflow.habitpact.domain.model.HabitCompletion;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
public interface HabitCompletionMapper {

    HabitCompletionResponse habitCompletionToHabitCompletionResponse(HabitCompletion habitCompletion);
}
