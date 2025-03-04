package com.kaizenflow.habitpact.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.kaizenflow.habitpact.domain.dto.response.HabitResponse;
import com.kaizenflow.habitpact.domain.model.habit.Habit;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
public interface HabitMapper {

    HabitResponse habitToHabitResponse(Habit habit);
}
