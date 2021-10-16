package com.bmstu.hotelservice.services;

import com.bmstu.hotelservice.entities.Hotel;
import com.bmstu.hotelservice.repositories.HotelRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.net.http.HttpConnectTimeoutException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class HotelService {
    private final HotelRepository hotelRepository;
    private final BookingService bookingService;
    private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);


    @PostConstruct
    private void fillTable(){
        this.create(new Hotel(null, "123", "452", "789", "10", "12", 13, 14, "15", 150.0));
        this.create(new Hotel(null, "223", "456", "787", "10", "12", 13, 14, "15", 150.0));
        this.create(new Hotel(null, "323", "453", "789", "10", "12", 13, 14, "15", 150.0));
        this.create(new Hotel(null, "423", "456", "789", "10", "12", 13, 14, "15", 150.0));
    }

    public HotelService(HotelRepository hotelRepository, BookingService bookingService) {
        this.hotelRepository = hotelRepository;
        this.bookingService = bookingService;
    }

    public void create(Hotel hotel){
        hotelRepository.save(hotel);
    }

    public Hotel read(Long id){
        return hotelRepository.getHotelById(id);
    }

    public boolean update(Hotel hotel, Long id){
        Hotel dbHotel = hotelRepository.getById(id);
        if(dbHotel != null){
            hotel.setId(id);
            hotelRepository.save(hotel);
            return true;
        }
        return false;
    }

    public void delete(Long id){
        hotelRepository.deleteById(id);
    }


    public List<Hotel> getAllHotelByOwnerLogin(String ownerLogin){
        return hotelRepository.findAllByOwnerLogin(ownerLogin);
    }

    public Hotel getByNameAndCityAndCountry(String name, String city, String country){
        return hotelRepository.findByNameAndCityAndCountry(name, city, country);
    }

    public List<Hotel> getAllHotel(){
        return hotelRepository.findAll();
    }

    public List<Hotel> getAllHotelByDateAndCity(String dateFrom, String dateTo, String city, String country){
        List<Hotel> hotels = hotelRepository.findAll();
        if(city != null && !city.isBlank()) hotels = hotels.stream().filter(hotel -> hotel.getCity().equals(city)).collect(Collectors.toList());

        if(country != null && !country.isBlank()) hotels = hotels.stream().filter(hotel -> hotel.getCountry().equals(country)).collect(Collectors.toList());
        if(dateFrom != null && !dateFrom.isBlank() && dateTo != null && !dateTo.isBlank()) {
            try {
                sdf.parse(dateFrom);
                sdf.parse(dateTo);
                hotels.forEach(hotel -> {
                    try {
                        int numberBookingOnThisDate = bookingService.getNumberOfAllBookingByFilter(dateFrom, dateTo, hotel.getId());
                        hotel.setNumberAvailableRooms(hotel.getNumberRooms() - numberBookingOnThisDate);
                    } catch (HttpConnectTimeoutException e) {
                        hotel.setNumberAvailableRooms(0);
                        e.printStackTrace();
                    }
                });
                hotels = hotels.stream().filter(hotel -> hotel.getNumberAvailableRooms() > 0).collect(Collectors.toList());
            } catch (ParseException ignored) {}
        }
        return hotels;
    }
}
