package com.bmstu.bookingservice.repositories;

import com.bmstu.bookingservice.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Calendar;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findAllByHotelId(Long hotelId);
    List<Booking> findAllByClientId(Long clientId);
    Booking getBookingById(Long id);
    Booking getBookingByClientIdAndHotelIdAndDateFromAndDateTo(Long clientId, Long hotelId, Calendar dateFrom, Calendar dateTo);
}