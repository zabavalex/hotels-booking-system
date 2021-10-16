package com.bmstu.hotelservice.repositories;

import com.bmstu.hotelservice.entities.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findAllByOwnerLogin(String ownerLogin);
    Hotel findByNameAndCityAndCountry(String name, String city, String country);
    Hotel getHotelById(Long id);
    List<Hotel> findAllByCity(String city);
}