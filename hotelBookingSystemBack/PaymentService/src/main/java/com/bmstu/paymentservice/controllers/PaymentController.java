package com.bmstu.paymentservice.controllers;

import com.bmstu.paymentservice.autfConfig.jwt.JwtTokenService;
import com.bmstu.paymentservice.entity.Pay;
import com.bmstu.paymentservice.request.AuthRequest;
import com.bmstu.paymentservice.request.PayCreateRequest;
import com.bmstu.paymentservice.responsie.ErrorResponse;
import com.bmstu.paymentservice.service.PayService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("payment")
public class PaymentController {
    private JwtTokenService jwtTokenService;
    private PayService payService;
    @Value("${server.login}")
    private String login;
    @Value("${server.password}")
    private String password;

    public PaymentController(JwtTokenService jwtTokenService, PayService payService) {
        this.jwtTokenService = jwtTokenService;
        this.payService = payService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            String login = request.getUsername();
            String password = request.getPassword();

            if (login == null || password == null ||
                    !login.equals(this.login) || !password.equals(this.password)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            String token = jwtTokenService.createToken(login, password);

            Map<Object, Object> response = new HashMap<>();
            response.put("login", login);
            response.put("token", token);

            return new ResponseEntity<>(response ,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        payService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Pay pay){
        boolean update = payService.update(pay, id);

        return update
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/create")
    public ResponseEntity<?> create(@RequestBody PayCreateRequest pay){
        if(payService.getByBookingId(pay.getBookingId()) == null) {
            payService.create(new Pay(pay));
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ErrorResponse("Ошибка оплата", "Оплата уже была произведена"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/check")
    public ResponseEntity<?> check(@RequestBody Long bookingId){
        if(payService.getByBookingId(bookingId) != null){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }



}
