package com.bmstu.bookingservice.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllBookingByFilterRequest {
    private String dateFrom;
    private String dateTo;
}
