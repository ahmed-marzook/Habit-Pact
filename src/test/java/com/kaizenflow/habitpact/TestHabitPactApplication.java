package com.kaizenflow.habitpact;

import org.springframework.boot.SpringApplication;

public class TestHabitPactApplication {

    public static void main(String[] args) {
        SpringApplication.from(HabitPactApplication::main)
                .with(TestcontainersConfiguration.class)
                .run(args);
    }
}
