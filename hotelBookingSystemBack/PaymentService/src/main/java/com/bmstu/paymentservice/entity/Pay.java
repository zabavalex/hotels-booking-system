package com.bmstu.paymentservice.entity;

import com.bmstu.paymentservice.request.PayCreateRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Calendar;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "PAY")
@Entity
public class Pay {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    private Long userId;
    private Long bookingId;
    private String price;

    public Pay(PayCreateRequest pay) {
        userId = pay.getUserId();
        bookingId = pay.getBookingId();
        price = pay.getPrice();
    }
}
