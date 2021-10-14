package com.bmstu.gateawayservice.controllers;

import com.bmstu.gateawayservice.requests.GetAllByFilterRequest;
import com.bmstu.gateawayservice.requests.Hotel;
import com.bmstu.gateawayservice.response.ErrorResponse;
import com.bmstu.gateawayservice.services.HotelService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpConnectTimeoutException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("hotels")
public class HotelControllers {
    private HotelService hotelService;

    public HotelControllers(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAll(){
        try {
            ResponseEntity<?> response = hotelService.getAll();
            return new ResponseEntity<>(response.getBody() ,response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @PostMapping("/getallbyfilter")
    public ResponseEntity<?> getAllByFilter(@RequestBody GetAllByFilterRequest request){
        try {
            ResponseEntity<?> response = hotelService.getAllByFilter(request);
            return new ResponseEntity<>(response.getBody() ,response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }


    @GetMapping("/{ownerLogin}/getall")
    public ResponseEntity<?> getAllByOwnerLogin(@PathVariable String ownerLogin){
        try {
            ResponseEntity<?> response = hotelService.getAllByOwnerLogin(ownerLogin);
            return new ResponseEntity<>(response.getBody() ,response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        try {
            ResponseEntity<?> response = hotelService.getById(id);
            return new ResponseEntity<>(response.getBody() ,response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            ResponseEntity<?> response = hotelService.delete(id);
            return new ResponseEntity<>(response.getBody() ,response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Hotel hotel){
        try {
            ResponseEntity<?> response = hotelService.update(id, hotel);
            return new ResponseEntity<>(response.getBody() ,response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }
}
