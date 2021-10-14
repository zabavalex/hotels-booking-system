package com.bmstu.bookingservice.controllers;

import com.bmstu.bookingservice.autfConfig.jwt.JwtTokenService;
import com.bmstu.bookingservice.entities.Booking;
import com.bmstu.bookingservice.requests.AuthRequest;
import com.bmstu.bookingservice.requests.BookingCreate;
import com.bmstu.bookingservice.requests.GetAllBookingByFilterRequest;
import com.bmstu.bookingservice.response.BookingDetails;
import com.bmstu.bookingservice.response.ErrorResponse;
import com.bmstu.bookingservice.services.BookingService;
import org.springframework.beans.factory.annotation.Value;
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
    private JwtTokenService jwtTokenService;
    private BookingService bookingService;

    @Value("${server.login}")
    private String login;
    @Value("${server.password}")
    private String password;

    public BookingControllers(JwtTokenService jwtTokenService, BookingService bookingService) {
        this.jwtTokenService = jwtTokenService;
        this.bookingService = bookingService;
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

    @GetMapping("/{hotelId}/getallbyhotelid")
    public ResponseEntity<?> getAllByHotelId(@PathVariable Long hotelId){
        return new ResponseEntity<>(bookingService.getAllBookingByHotelId(hotelId), HttpStatus.OK);
    }

    @PostMapping("/{hotelId}/getallbyfilter")
    public ResponseEntity<?> getAllByFilter(@PathVariable Long hotelId, @RequestBody GetAllBookingByFilterRequest request){
        return new ResponseEntity<>(bookingService.getAllBookingByDateAndHotelId(request.getDateFrom(),
                request.getDateTo(), hotelId),
                HttpStatus.OK);
    }

    @GetMapping("/{clientId}/getall")
    public ResponseEntity<?> getAllByClientId(@PathVariable Long clientId){
        return new ResponseEntity<>(bookingService.getAllBookingByClientId(clientId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Booking booking = bookingService.read(id);
        return booking != null
                ? new ResponseEntity<>(booking, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}/getdetails")
    public ResponseEntity<?> getDetailsById(@PathVariable Long id){
        try {
            BookingDetails booking = bookingService.getDetails(id);
            if(booking == null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } catch (HttpConnectTimeoutException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        bookingService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Booking booking){
        boolean update = bookingService.update(booking, id);

        return update
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/create")
    public ResponseEntity<?> create(@RequestBody BookingCreate bookingCreate){
        try {
            if(bookingService.checkBeforeCreate(bookingCreate)) {
                bookingService.create(bookingCreate);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ErrorResponse("Ошибка бронирования", "Бронирование по указанным данным уже произведено"), HttpStatus.BAD_REQUEST);
            }
        } catch (ParseException e) {
            return new ResponseEntity<>(new ErrorResponse("Ошибка бронирования", "Неверный формат дат"), HttpStatus.BAD_REQUEST);
        }
    }
}
