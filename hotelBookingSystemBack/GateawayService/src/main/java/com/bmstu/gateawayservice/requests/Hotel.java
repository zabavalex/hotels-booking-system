package com.bmstu.gateawayservice.requests;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Collection;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Hotel {
    private Long id;
    private String name;
    private String country;
    private String city;
    private String address;
    private String description;
    private int numberAvailableRooms;
    private int numberRooms;
    private String ownerLogin;
    private Double price;
}
