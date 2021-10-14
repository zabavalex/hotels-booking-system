package com.bmstu.paymentservice.server;

import com.bmstu.paymentservice.entity.Pay;
import com.bmstu.paymentservice.repositories.PayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PayServer {
    @Autowired
    private PayRepository payRepository;

    public Pay read(Long id){
        return payRepository.getById(id);
    }

    public boolean update(Pay pay, Long id){
        Pay dbPay = payRepository.getById(id);
        if(dbPay != null){
            pay.setId(id);
            payRepository.save(pay);
            return true;
        }
        return false;
    }

    public void delete(Long id){
        payRepository.deleteById(id);
    }

    public Pay getByBookingId(Long bookingId){
        return payRepository.getById(bookingId);
    }
}
