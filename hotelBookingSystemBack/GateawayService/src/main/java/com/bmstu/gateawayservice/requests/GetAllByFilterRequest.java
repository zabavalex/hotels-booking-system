package com.bmstu.gateawayservice.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllByFilterRequest {
    private String dateFrom;
    private String dateTo;
    private String city;
    private String country;
}
