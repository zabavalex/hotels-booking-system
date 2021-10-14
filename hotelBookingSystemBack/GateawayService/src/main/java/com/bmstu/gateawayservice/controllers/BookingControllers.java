package com.bmstu.gateawayservice.controllers;

import com.bmstu.gateawayservice.requests.*;
import com.bmstu.gateawayservice.response.ErrorResponse;
import com.bmstu.gateawayservice.services.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpConnectTimeoutException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("booking")
public class BookingControllers {
    private BookingService bookingService;


    public BookingControllers(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/{hotelId}/getallbyhotelid")
    public ResponseEntity<?> getAllByHotelId(@PathVariable Long hotelId){
        try {
            return bookingService.getAllByHotelId(hotelId);
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @PostMapping("/{hotelId}/getallbyfilter")
    public ResponseEntity<?> getAllByFilter(@PathVariable Long hotelId, @RequestBody GetAllBookingByFilterRequest request){
        try {
            return bookingService.getAllByFilter(request, hotelId);
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @GetMapping("/{clientId}/getall")
    public ResponseEntity<?> getAllByClientId(@PathVariable Long clientId){
        try {
            ResponseEntity<?> response = bookingService.getAllByClientId(clientId);;
            return new ResponseEntity<>(response.getBody(), response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @GetMapping("/{id}/getdetails")
    public ResponseEntity<?> getDetailsById(@PathVariable Long id){
        try {
            ResponseEntity<?> response = bookingService.getDetails(id);
            return new ResponseEntity<>(response.getBody(), response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        try {
            ResponseEntity<?> response = bookingService.getById(id);
            return new ResponseEntity<>(response.getBody(), response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            ResponseEntity<?> response = bookingService.delete(id);
            return new ResponseEntity<>(response.getBody(), response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Booking booking){
        try {
            return bookingService.update(id, booking);
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @PutMapping("/create")
    public ResponseEntity<?> create(@RequestBody BookingCreate bookingCreate){
        try {
            ResponseEntity<?> response = bookingService.create(bookingCreate);
            return new ResponseEntity<>(response.getBody() ,response.getStatusCode());
        } catch (HttpConnectTimeoutException e) {
            return new ResponseEntity<>(new ErrorResponse("Ошибка сервера", "повторите попытку позже"), HttpStatus.GATEWAY_TIMEOUT);
        }
    }
}
