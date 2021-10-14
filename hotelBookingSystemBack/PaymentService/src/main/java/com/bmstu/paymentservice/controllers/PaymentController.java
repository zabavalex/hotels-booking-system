package com.bmstu.paymentservice.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("payment")
public class PaymentController {
    private JwtTokenService jwtTokenService;
    private BookingService bookingService;

    @Value("${server.login}")
    private String login;
    @Value("${server.password}")
    private String password;



}
