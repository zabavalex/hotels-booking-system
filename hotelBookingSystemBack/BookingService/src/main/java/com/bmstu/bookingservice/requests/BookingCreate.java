package com.bmstu.bookingservice.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Calendar;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingCreate {
    private String dateFrom;
    private String dateTo;
    private Long hotelId;
    private Long clientId;
}
