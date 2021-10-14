package com.bmstu.bookingservice.response;

import com.bmstu.bookingservice.entities.Booking;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Locale;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDetails {
    private String id;
    private String dateFrom;
    private String dateTo;
    private String hotelId;
    private String clientId;
    private String name;
    private String country;
    private String city;
    private String address;
    private String description;
    private String ownerLogin;
    private String price;

    public BookingDetails(Hotel hotel, Booking booking) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        id = String.valueOf(booking.getId());
        dateFrom = sdf.format(booking.getDateFrom().getTime());
        dateTo = sdf.format(booking.getDateTo().getTime());
        hotelId = String.valueOf(booking.getHotelId());
        clientId = booking.getClientId().toString();
        name = hotel.getName();
        country = hotel.getCountry();
        city = hotel.getCity();
        address = hotel.getAddress();
        description = hotel.getDescription();
        ownerLogin = hotel.getOwnerLogin();
        price = String.valueOf(hotel.getPrice());
    }
}
