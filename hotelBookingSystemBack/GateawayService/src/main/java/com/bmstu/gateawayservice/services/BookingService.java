package com.bmstu.gateawayservice.services;

import com.bmstu.gateawayservice.requests.*;
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
public class BookingService {
    @Autowired
    private Gson gson;
    private String token;
    @Value("${bookingService.host}")
    private String host;
    @Value("${bookingService.updateToken}")
    private String updateToken;
    @Value("${bookingService.getAllByFilter}")
    private String getAllByFilter;
    @Value("${bookingService.getAllByHotelId}")
    private String getAllByHotelId;
    @Value("${bookingService.getAllByClientId}")
    private String getAllByClientId;
    @Value("${bookingService.getById}")
    private String getById;
    @Value("${bookingService.delete}")
    private String delete;
    @Value("${bookingService.update}")
    private String update;
    @Value("${bookingService.create}")
    private String create;
    @Value("${bookingService.getDetails}")
    private String getDetails;
    @Value("${bookingService.password}")
    private String password;
    @Value("${bookingService.login}")
    private String login;

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

    public ResponseEntity<?> getAllByFilter(GetAllBookingByFilterRequest getAllBookingByFilterRequest, Long hotelId) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + getAllByFilter.replaceFirst("\\{hotelId}", String.valueOf(hotelId));
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<GetAllBookingByFilterRequest> request = new HttpEntity<>(getAllBookingByFilterRequest, headers);
        result = restTemplate.postForEntity(url, request, String.class);
        if (result.getStatusCode().equals(HttpStatus.OK)) {
            return result;
        } else if (result.getStatusCode().equals(HttpStatus.FORBIDDEN)) {
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(getAllBookingByFilterRequest, headers);
            result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
            if (result.getStatusCode().equals(HttpStatus.OK)) {
                return result;
            }
        }
        return result;
    }

    public ResponseEntity<?> getAllByHotelId(Long hotelId) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + getAllByHotelId.replaceFirst("\\{hotelId}", String.valueOf(hotelId));
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

    public ResponseEntity<?> getAllByClientId(Long clientId) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + getAllByClientId.replaceFirst("\\{clientId}", String.valueOf(clientId));
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

    public ResponseEntity<?> update(Long id, Booking booking) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + update.replaceFirst("\\{id}", String.valueOf(id));
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<Booking> request = new HttpEntity<>(booking, headers);
        result = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
        if (result.getStatusCode().equals(HttpStatus.OK)) {
            return result;
        } else if (result.getStatusCode().equals(HttpStatus.FORBIDDEN)) {
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(booking, headers);
            result = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
            if (result.getStatusCode().equals(HttpStatus.OK)) {
                return result;
            }
        }
        return result;
    }


    public ResponseEntity<?> create(BookingCreate bookingCreate) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + create;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> result;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<BookingCreate> request = new HttpEntity<>(bookingCreate, headers);
        try {
            result = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
        } catch (HttpClientErrorException e1){
            updateToken();
            headers = new HttpHeaders();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(bookingCreate, headers);
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

    public ResponseEntity<?> getDetails(Long id) throws HttpConnectTimeoutException {
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + getDetails.replaceFirst("\\{id}", String.valueOf(id));
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
}
