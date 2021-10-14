package com.bmstu.gateawayservice.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingCreate {
    private String dateFrom;
    private String dateTo;
    private Long hotelId;
    private Long clientId;
}
