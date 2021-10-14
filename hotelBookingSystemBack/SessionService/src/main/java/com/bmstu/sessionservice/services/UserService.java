package com.bmstu.sessionservice.services;

import com.bmstu.sessionservice.entities.User;
import com.bmstu.sessionservice.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public void create(User user){
        userRepo.save(user);
    }

    public User read(Long id){
        return userRepo.getUserById(id);
    }

    public boolean update(User user, Long id){
        User dbUser = userRepo.getUserById(id);
        if(dbUser != null){
            user.setId(id);
            userRepo.save(user);
            return true;
        }
        return false;
    }

    public void delete(Long id){
        userRepo.deleteById(id);
    }


    public User getUserByLogin(String login){
        return userRepo.getUserByLogin(login);
    }
    public User getUserByLoginAndPassword(String login, String password){
        return userRepo.getUserByLoginAndPassword(login, password);
    }
    public User getUserByEmail(String email) { return userRepo.getUserByEmail(email); }
}
