package com.kaizenflow.habitpact.repository;

import com.kaizenflow.habitpact.domain.model.Habit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HabitRepository extends MongoRepository<Habit, String> {
}
