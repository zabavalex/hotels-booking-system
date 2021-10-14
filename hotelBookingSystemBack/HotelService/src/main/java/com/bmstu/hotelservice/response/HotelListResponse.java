package com.bmstu.hotelservice.response;

import com.bmstu.hotelservice.entities.Hotel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelListResponse {
    private List<Hotel> hotelList;
}
