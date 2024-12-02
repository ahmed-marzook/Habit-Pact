--liquibase formatted SQL

--changeset ahmedM:V0001
--comment: creating a user table

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_uuid UUID UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE habits (
    habit_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(500) NULL,
    habit_frequency_type VARCHAR(10) NOT NULL,
    frequency INT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);