package com.kaizenflow.habitpact;

import com.kaizenflow.habitpact.domain.model.User;
import com.kaizenflow.habitpact.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HabitPactApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(HabitPactApplication.class, args);
    }

	@Override
	public void run(String... args) throws Exception {
		User user = User.builder().email("ahmed@email.com").firstName("Ahmed").lastName("Marzook").username("marza004").build();
		userRepository.save(user);
	}
}
