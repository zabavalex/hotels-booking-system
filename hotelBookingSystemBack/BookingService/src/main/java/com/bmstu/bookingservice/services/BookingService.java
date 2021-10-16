package com.bmstu.bookingservice.services;

import com.bmstu.bookingservice.entities.Booking;
import com.bmstu.bookingservice.repositories.BookingRepository;
import com.bmstu.bookingservice.requests.BookingCreate;
import com.bmstu.bookingservice.response.BookingDetails;
import com.bmstu.bookingservice.response.Hotel;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.http.HttpConnectTimeoutException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class BookingService {
    private final PayService payService;
    private final BookingRepository bookingRepository;
    private final HotelService hotelService;
    private final Gson gson;
    private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

    public BookingService(PayService payService, BookingRepository hotelRepository, HotelService hotelService, Gson gson) {
        this.payService = payService;
        this.bookingRepository = hotelRepository;
        this.hotelService = hotelService;
        this.gson = gson;
    }

    public boolean checkBeforeCreate(BookingCreate bookingCreate) throws ParseException {
        Calendar dateFrom = Calendar.getInstance();
        Calendar dateTo = Calendar.getInstance();
        dateFrom.setTime(sdf.parse(bookingCreate.getDateFrom()));
        dateTo.setTime(sdf.parse(bookingCreate.getDateTo()));
        return bookingRepository.getBookingByClientIdAndHotelIdAndDateFromAndDateTo(bookingCreate.getClientId(),
                bookingCreate.getHotelId(), dateFrom, dateTo) == null;
    }

    public BookingDetails getDetails(Long id) throws HttpConnectTimeoutException {
        Booking booking = bookingRepository.getBookingById(id);
        if(booking != null){
            ResponseEntity<?> response = hotelService.getById(booking.getHotelId());
            if(response.getStatusCode() == HttpStatus.OK) {
                Hotel hotel = gson.fromJson(String.valueOf(response.getBody()), Hotel.class);
                boolean isPaid = false;
                try {
                    ResponseEntity<?> responseFromPay = payService.check(booking.getClientId());
                    if(Objects.equals(responseFromPay.getBody(), "true")){
                        isPaid = true;
                    }
                } catch (HttpConnectTimeoutException e) {
                    e.printStackTrace();
                }
                booking.setPaid(isPaid);
                return new BookingDetails(hotel, booking);
            }
        }
        return null;
    }

    public void create(BookingCreate bookingCreate) throws ParseException {
        Booking booking = new Booking();
        booking.setClientId(bookingCreate.getClientId());
        booking.setHotelId(bookingCreate.getHotelId());
        Calendar dateFrom = Calendar.getInstance();
        Calendar dateTo = Calendar.getInstance();
        dateFrom.setTime(sdf.parse(bookingCreate.getDateFrom()));
        dateTo.setTime(sdf.parse(bookingCreate.getDateTo()));
        booking.setDateFrom(dateFrom);
        booking.setDateTo(dateTo);
        bookingRepository.save(booking);
    }

    public Booking read(Long id){
        return bookingRepository.getBookingById(id);
    }

    public boolean update(Booking booking, Long id){
        Booking dbBooking = bookingRepository.getById(id);
        if(dbBooking != null){
            booking.setId(id);
            bookingRepository.save(booking);
            return true;
        }
        return false;
    }

    public void delete(Long id){
        bookingRepository.deleteById(id);
    }

    public List<Booking> getAllBookingByHotelId(Long hotelId){
        return bookingRepository.findAllByHotelId(hotelId);
    }

    public List<Booking> getAllBookingByDateAndHotelId(String dateFrom, String dateTo,Long hotelId){
        return bookingRepository.findAllByHotelId(hotelId).stream().filter(booking -> {
            Calendar dateFromCalendar = Calendar.getInstance();
            Calendar dateToCalendar = Calendar.getInstance();
            try {
                dateFromCalendar.setTime(sdf.parse(dateFrom));
                dateToCalendar.setTime(sdf.parse(dateTo));
                if((booking.getDateFrom().after(dateFromCalendar) && booking.getDateFrom().before(dateToCalendar))
                        || booking.getDateFrom().equals(dateFromCalendar) || booking.getDateTo().equals(dateToCalendar)
                        || (booking.getDateTo().after(dateFromCalendar) && booking.getDateTo().before(dateToCalendar))){
                    return  true;
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return false;
        }).collect(Collectors.toList());
    }

    public List<Booking> getAllBookingByClientId(Long clientId){
        List<Booking> bookings = bookingRepository.findAllByClientId(clientId);
        bookings.forEach(booking -> {
            boolean isPaid = false;
            try {
                ResponseEntity<?> response = payService.check(booking.getId());
                if(Objects.equals(response.getBody(), "true")){
                    isPaid = true;
                }
            } catch (HttpConnectTimeoutException e) {
                e.printStackTrace();
            }
            booking.setPaid(isPaid);
        });
        return bookings;
    }
}
