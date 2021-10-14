package com.bmstu.sessionservice.controllers;


import com.bmstu.sessionservice.autfConfig.jwt.JwtTokenService;
import com.bmstu.sessionservice.entities.User;
import com.bmstu.sessionservice.requests.CreateUserRequest;
import com.bmstu.sessionservice.response.ErrorResponse;
import com.bmstu.sessionservice.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("user")
public class UserController {
    private final UserService userService;
    private final JwtTokenService jwtTokenService;

    public UserController(UserService userService, JwtTokenService jwtTokenService) {
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
    }

    @PutMapping("/create")
    public ResponseEntity<?> create(@RequestBody CreateUserRequest request){
        if(request.getLogin() == null || request.getPassword() == null ||
                userService.getUserByLogin(request.getLogin()) != null){
            return new ResponseEntity<>(new ErrorResponse("Ошибка регистрации", "Некорректные данные"),HttpStatus.BAD_REQUEST);
        }
        if(userService.getUserByLogin(request.getLogin()) != null)
            return new ResponseEntity<>(new ErrorResponse("Ошибка регистрации",
                    "Пользователь с таким логином уже создан"), HttpStatus.BAD_REQUEST);
        if(userService.getUserByEmail(request.getEmail()) != null)
            return new ResponseEntity<>(new ErrorResponse("Ошибка регистрации",
                    "Пользователь с такой почтой уже создан"), HttpStatus.BAD_REQUEST);
        userService.create(new User(request.getLogin(), request.getPassword(), request.getEmail(), "ROLE_USER"));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String token){
        userService.delete(userService.getUserByLogin(jwtTokenService.getUsername(jwtTokenService.resolveToken(token))).getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("/")
    public ResponseEntity<?> get(@RequestHeader("Authorization") String token){
        final User user = userService.read(userService.getUserByLogin(jwtTokenService.getUsername(jwtTokenService.resolveToken(token))).getId());
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/")
    public ResponseEntity<?> update(@RequestHeader("Authorization") String token, @RequestBody CreateUserRequest request){
        final boolean updated = userService.update(new User(request.getLogin(), request.getPassword(), request.getEmail(), "ROLE_USER"),
                userService.getUserByLogin(jwtTokenService.getUsername(jwtTokenService.resolveToken(token))).getId());

        return updated
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
}
