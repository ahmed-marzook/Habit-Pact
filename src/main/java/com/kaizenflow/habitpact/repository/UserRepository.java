package com.kaizenflow.habitpact.repository;

import com.kaizenflow.habitpact.domain.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
