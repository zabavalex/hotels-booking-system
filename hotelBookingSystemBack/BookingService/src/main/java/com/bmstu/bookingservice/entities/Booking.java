package com.bmstu.bookingservice.entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "BOOKING")
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    private boolean isPaid;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Calendar dateFrom;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Calendar dateTo;

    @Column(nullable = false)
    private Long hotelId;
    @Column(nullable = false)
    private Long clientId;

    public void setPaid(boolean paid) {
        isPaid = paid;
    }

    public boolean isPaid() {
        return isPaid;
    }
}