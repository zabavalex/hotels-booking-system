package com.bmstu.hotelservice.controllers;

import com.bmstu.hotelservice.autfConfig.jwt.JwtTokenService;
import com.bmstu.hotelservice.entities.Hotel;
import com.bmstu.hotelservice.requests.AuthRequest;
import com.bmstu.hotelservice.requests.GetAllByFilterRequest;
import com.bmstu.hotelservice.response.ErrorResponse;
import com.bmstu.hotelservice.services.HotelService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("hotels")
public class HotelControllers {
    private JwtTokenService jwtTokenService;
    private HotelService hotelService;

    @Value("${server.login}")
    private String login;
    @Value("${server.password}")
    private String password;

    public HotelControllers(JwtTokenService jwtTokenService, HotelService hotelService) {
        this.jwtTokenService = jwtTokenService;
        this.hotelService = hotelService;
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

    @GetMapping("/getall")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(hotelService.getAllHotel(), HttpStatus.OK);
    }

    @PostMapping("/getallbyfilter")
    public ResponseEntity<?> getAllByFilter(@RequestBody GetAllByFilterRequest request){
        return new ResponseEntity<>(hotelService.getAllHotelByDateAndCity(request.getDateFrom(),
                request.getDateTo(), request.getCity(), request.getCountry()), HttpStatus.OK);
    }


    @GetMapping("/{ownerLogin}/getall")
    public ResponseEntity<?> getAllByOwnerLogin(@PathVariable String ownerLogin){
        return new ResponseEntity<>(hotelService.getAllHotelByOwnerLogin(ownerLogin), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Hotel hotel = hotelService.read(id);
        return hotel != null
                ? new ResponseEntity<>(hotel, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        hotelService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Hotel hotel){
        boolean update = hotelService.update(hotel, id);

        return update
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
