package com.kaizenflow.habitpact.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kaizenflow.habitpact.repository.HabitRepository;

@Service
public class HabitService {

    private HabitRepository habitRepository;

    @Autowired
    public HabitService(HabitRepository habitRepository) {
        this.habitRepository = habitRepository;
    }
}
