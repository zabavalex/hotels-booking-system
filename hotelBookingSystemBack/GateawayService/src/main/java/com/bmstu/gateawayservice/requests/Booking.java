package com.bmstu.gateawayservice.requests;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Calendar;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Booking {
    private Long id;
    private Calendar from;
    private Calendar to;
    private Long hotelId;
    private Long clientId;
}