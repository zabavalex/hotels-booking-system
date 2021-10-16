package com.bmstu.gateawayservice.services;

import com.bmstu.gateawayservice.requests.AuthRequest;
import com.bmstu.gateawayservice.requests.BookingCreate;
import com.bmstu.gateawayservice.requests.PayCreateRequest;
import com.bmstu.gateawayservice.response.ErrorResponse;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.http.HttpConnectTimeoutException;
import java.util.Map;

@Service
public class PayService {
    @Autowired
    private Gson gson;
    private String token;
    @Value("${payService.host}")
    private String host;
    @Value("${payService.updateToken}")
    private String updateToken;
    @Value("${payService.create}")
    private String create;
    @Value("${payService.login}")
    private String login;
    @Value("${payService.password}")
    private String password;
    @Value("${payService.check}")
    private String check;


    private void updateToken() {
        String url = "http://" + host + updateToken;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result;
        AuthRequest authRequest = new AuthRequest(login, password);
        HttpEntity<AuthRequest> request = new HttpEntity<>(authRequest);
        result = restTemplate.postForEntity(url, request, String.class);
        if(result.getStatusCode().equals(HttpStatus.OK)){
            Map<String, String> map = gson.fromJson(result.getBody(), new TypeToken<Map<String, String>>(){}.getType());
            if (map != null) {
                token = map.get("token");
            }
        }
    }

    private void updateTokenWithTimer() throws HttpConnectTimeoutException {
        token = null;
        for(int i = 0; i < 3; i++){
            updateToken();
            if(token == null){
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            } else{
                break;
            }
        }
        if(token == null){
            throw new HttpConnectTimeoutException("Connection timeout exception: BookingServer");
        }
    }

    public ResponseEntity<?> create(PayCreateRequest pay) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + create;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<PayCreateRequest> request = new HttpEntity<>(pay, headers);
        try {
            result = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
        } catch (HttpClientErrorException e1){
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(pay, headers);
            try {
                result = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
            } catch (HttpClientErrorException e2){
                String message = e2.getMessage();
                if(message != null && !message.isBlank()){
                    ErrorResponse response =  gson.fromJson(message.substring(7, message.length() - 1), ErrorResponse.class);
                    return new ResponseEntity<>(response ,e2.getStatusCode());
                }
                return new ResponseEntity<>(e2.getStatusCode());
            }
        }
        return result;
    }

    public ResponseEntity<?> check(Long id) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + check;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<Long> request = new HttpEntity<>(id, headers);
        try {
            result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
        } catch (HttpClientErrorException e1){
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(id, headers);
            try {
                result = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
            } catch (HttpClientErrorException e2){
                String message = e2.getMessage();
                if(message != null && !message.isBlank()){
                    ErrorResponse response =  gson.fromJson(message.substring(7, message.length() - 1), ErrorResponse.class);
                    return new ResponseEntity<>(response ,e2.getStatusCode());
                }
                return new ResponseEntity<>(e2.getStatusCode());
            }
        }
        return result;
    }

}
