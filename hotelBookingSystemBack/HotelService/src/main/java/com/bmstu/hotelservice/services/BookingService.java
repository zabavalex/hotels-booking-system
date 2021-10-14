package com.bmstu.hotelservice.services;

import com.bmstu.hotelservice.requests.AuthRequest;
import com.bmstu.hotelservice.requests.GetAllBookingByFilterRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import javax.persistence.EntityNotFoundException;
import java.net.http.HttpConnectTimeoutException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookingService {
    private String token;
    @Value("${bookingServiceUrl.host}")
    private String host;
    @Value("${bookingServiceUrl.updateToken}")
    private String updateToken;
    @Value("${bookingServiceUrl.getAllByFilter}")
    private String getAllByFilter;
    @Autowired
    private Gson gson;

    @Value("${bookingServiceUrl.login}")
    private String login;
    @Value("${bookingServiceUrl.password}")
    private String password;

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

    public int getNumberOfAllBookingByFilter(String dataFrom, String dataTo, Long hotelId) throws HttpConnectTimeoutException, EntityNotFoundException{
        if (token == null) updateTokenWithTimer();
        String url = "http://" + host + getAllByFilter.replaceFirst("\\{hotelId}", String.valueOf(hotelId));
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result;
        GetAllBookingByFilterRequest getAllBookingByFilterRequest = new GetAllBookingByFilterRequest(dataFrom, dataTo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer_" + token);
        HttpEntity<GetAllBookingByFilterRequest> request = new HttpEntity<>(getAllBookingByFilterRequest, headers);
        result = restTemplate.postForEntity(url, request, String.class);
        if (result.getStatusCode().equals(HttpStatus.OK)) {
            List<String> list = gson.fromJson(result.getBody(), new TypeToken<List<Object>>(){}.getType());
            if (list != null) {
                return list.size();
            }
        } else if (result.getStatusCode().equals(HttpStatus.FORBIDDEN)) {
            updateToken();
            headers.set("Authorization", "Bearer_" + token);
            request = new HttpEntity<>(getAllBookingByFilterRequest, headers);
            result = restTemplate.postForEntity(url, request, String.class);
            if (result.getStatusCode().equals(HttpStatus.OK)) {
                List<String> list = gson.fromJson(result.getBody(), new TypeToken<List<String>>(){}.getType());
                if (list != null) {
                    return list.size();
                }
            }
        }
        throw new EntityNotFoundException("Error find bookings with filter:" + getAllBookingByFilterRequest);
    }
}
