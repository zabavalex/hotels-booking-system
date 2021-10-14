package com.bmstu.sessionservice.controllers;

import com.bmstu.sessionservice.autfConfig.jwt.JwtTokenService;
import com.bmstu.sessionservice.entities.User;
import com.bmstu.sessionservice.requests.AuthRequest;
import com.bmstu.sessionservice.requests.VerifyRequest;
import com.bmstu.sessionservice.response.ErrorResponse;
import com.bmstu.sessionservice.services.UserService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    private final JwtTokenService jwtTokenService;

    private final UserService userService;

    public AuthController(JwtTokenService jwtTokenService,
                          UserService userService) {
        this.jwtTokenService = jwtTokenService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        String login = request.getUsername();
        User user = userService.getUserByLoginAndPassword(login, request.getPassword());

        if (user == null) {
            return new ResponseEntity<>(new ErrorResponse("Ошибка авторизации", "Неправильный логин или пароль") ,HttpStatus.NOT_FOUND);
        }

        String token = jwtTokenService.createToken(login, user.getPassword());

        Map<Object, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("login", login);
        response.put("role", user.getRole());
        response.put("token", token);

        return new ResponseEntity<>(response ,HttpStatus.OK);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody String token) {
        Map<Object, Object> response = new HashMap<>();
        if(token != null && jwtTokenService.validate(token)){
            response.put("success", true);
            return  new ResponseEntity<>(response ,HttpStatus.OK);
        }
        else{
            response.put("success", false);
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}

