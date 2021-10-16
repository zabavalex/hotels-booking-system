package com.bmstu.gateawayservice.services;

import com.bmstu.gateawayservice.requests.AuthRequest;
import com.bmstu.gateawayservice.requests.GetAllByFilterRequest;
import com.bmstu.gateawayservice.requests.Hotel;
import com.bmstu.gateawayservice.response.ErrorResponse;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.http.HttpConnectTimeoutException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HotelService {
    @Autowired
    private Gson gson;
    private String token;
    @Value("${hotelService.host}")
    private String host;
    @Value("${hotelService.updateToken}")
    private String updateToken;
    @Value("${hotelService.getAll}")
    private String getAll;
    @Value("${hotelService.getAllByFilter}")
    private String getAllByFilter;
    @Value("${hotelService.getAllByOwnerLogin}")
    private String getAllByOwnerLogin;
    @Value("${hotelService.getById}")
    private String getById;
    @Value("${hotelService.delete}")
    private String delete;
    @Value("${hotelService.update}")
    private String update;
    @Value("${hotelService.password}")
    private String password;
    @Value("${hotelService.login}")
    private String login;
    @Value("${hotelService.create}")
    private String create;

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

    public ResponseEntity<?> getAll() throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + getAll;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<?> request = new HttpEntity<>(null, headers);
        result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
        if (result.getStatusCode().equals(HttpStatus.OK)) {
            return result;
        } else if (result.getStatusCode().equals(HttpStatus.FORBIDDEN)) {
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(null, headers);
            result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
            if (result.getStatusCode().equals(HttpStatus.OK)) {
                return result;
            }
        }
        return result;
    }

    public ResponseEntity<?> getAllByFilter(GetAllByFilterRequest getAllByFilterRequest) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + getAllByFilter;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<GetAllByFilterRequest> request = new HttpEntity<>(getAllByFilterRequest, headers);
        result = restTemplate.postForEntity(url, request, String.class);
        if (result.getStatusCode().equals(HttpStatus.OK)) {
            return result;
        } else if (result.getStatusCode().equals(HttpStatus.FORBIDDEN)) {
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(getAllByFilterRequest, headers);
            result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
            if (result.getStatusCode().equals(HttpStatus.OK)) {
                return result;
            }
        }
        return result;
    }

    public ResponseEntity<?> getAllByOwnerLogin(String ownerLogin) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + getAllByOwnerLogin.replaceFirst("\\{ownerLogin}", ownerLogin);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<?> request = new HttpEntity<>(null, headers);
        result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
        if (result.getStatusCode().equals(HttpStatus.OK)) {
            return result;
        } else if (result.getStatusCode().equals(HttpStatus.FORBIDDEN)) {
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(null, headers);
            result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
            if (result.getStatusCode().equals(HttpStatus.OK)) {
                return result;
            }
        }
        return result;
    }

    public ResponseEntity<?> getById(Long id) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + getById.replaceFirst("\\{id}", String.valueOf(id));
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<?> request = new HttpEntity<>(null, headers);
        result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
        if (result.getStatusCode().equals(HttpStatus.OK)) {
            return result;
        } else if (result.getStatusCode().equals(HttpStatus.FORBIDDEN)) {
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(null, headers);
            result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
            if (result.getStatusCode().equals(HttpStatus.OK)) {
                return result;
            }
        }
        return result;
    }

    public ResponseEntity<?> delete(Long id) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + delete.replaceFirst("\\{id}", String.valueOf(id));
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<?> request = new HttpEntity<>(null, headers);
        result = restTemplate.exchange(url, HttpMethod.DELETE, request, String.class);
        if (result.getStatusCode().equals(HttpStatus.OK)) {
            return result;
        } else if (result.getStatusCode().equals(HttpStatus.FORBIDDEN)) {
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(null, headers);
            result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
            if (result.getStatusCode().equals(HttpStatus.OK)) {
                return result;
            }
        }
        return result;
    }

    public ResponseEntity<?> update(Long id, Hotel hotel) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + update.replaceFirst("\\{id}", String.valueOf(id));
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<Hotel> request = new HttpEntity<>(hotel, headers);
        result = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
        if (result.getStatusCode().equals(HttpStatus.OK)) {
            return result;
        } else if (result.getStatusCode().equals(HttpStatus.FORBIDDEN)) {
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(hotel, headers);
            result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
            if (result.getStatusCode().equals(HttpStatus.OK)) {
                return result;
            }
        }
        return result;
    }

    public ResponseEntity<?> create(Hotel hotel) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + create;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<Hotel> request = new HttpEntity<>(hotel, headers);
        try {
            result = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
        } catch (HttpClientErrorException e1){
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(hotel, headers);
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
