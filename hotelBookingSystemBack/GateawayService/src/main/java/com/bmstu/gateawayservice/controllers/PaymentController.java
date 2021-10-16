package com.bmstu.gateawayservice.controllers;

import com.bmstu.gateawayservice.autfConfig.jwt.JwtTokenService;
import com.bmstu.gateawayservice.requests.PayCreateRequest;
import com.bmstu.gateawayservice.response.ErrorResponse;
import com.bmstu.gateawayservice.services.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpConnectTimeoutException;

@RestController
@RequestMapping("payment")
public class PaymentController {
    private PayService payService;
    private JwtTokenService jwtTokenService;


    public PaymentController(JwtTokenService jwtTokenService, PayService payService) {
        this.jwtTokenService = jwtTokenService;
        this.payService = payService;
    }


    @PutMapping("/create")
    public ResponseEntity<?> create(@RequestBody PayCreateRequest pay){
        try {
            ResponseEntity<?> response = payService.create(pay);
            return new ResponseEntity<>(response.getBody() ,response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            return new ResponseEntity<>(new ErrorResponse("Ошибка сервера", "повторите попытку позже"), HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @GetMapping("/check")
    public ResponseEntity<?> check(@RequestBody Long bookingId){
        try {
            ResponseEntity<?> response = payService.check(bookingId);
            return new ResponseEntity<>(response.getBody() ,response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            return new ResponseEntity<>(new ErrorResponse("Ошибка сервера", "повторите попытку позже"), HttpStatus.GATEWAY_TIMEOUT);
        }
    }



}
