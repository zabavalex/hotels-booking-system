package com.bmstu.gateawayservice.services;

import com.bmstu.gateawayservice.requests.AuthRequest;
import com.bmstu.gateawayservice.requests.VerifyRequest;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.http.HttpConnectTimeoutException;
import java.util.Map;

@Service
public class SessionService {
    @Autowired
    private Gson gson;

    @Value("${sessionService.host}")
    private String host;
    @Value("${sessionService.verify}")
    private String verify;

    public boolean verify(String token) {
        String url = "http://" + host + verify;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result;
        VerifyRequest verifyRequest = new VerifyRequest(token);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<String> request = new HttpEntity<>(token, headers);
        result = restTemplate.postForEntity(url, request, String.class);
        return result.getStatusCode().equals(HttpStatus.OK);
    }


}
