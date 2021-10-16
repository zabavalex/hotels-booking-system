package com.bmstu.gateawayservice.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayCreateRequest {
    private Long userId;
    private Long bookingId;
    private String price;
}
