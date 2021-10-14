package com.bmstu.sessionservice.repositories;

import com.bmstu.sessionservice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User getUserByLogin(String login);
    User getUserByLoginAndPassword(String login, String password);
    User getUserById(Long id);
    User getUserByEmail(String email);
}