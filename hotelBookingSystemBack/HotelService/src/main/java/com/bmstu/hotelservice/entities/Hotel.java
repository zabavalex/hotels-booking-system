package com.bmstu.hotelservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "hotel")
@Entity
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
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
