package com.bmstu.paymentservice.repositories;

import com.bmstu.paymentservice.entity.Pay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayRepository extends JpaRepository<Pay, Long> {
    Pay findPayByBookingId(Long bookingId);
}