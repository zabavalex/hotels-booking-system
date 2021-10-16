package com.bmstu.paymentservice.service;

import com.bmstu.paymentservice.entity.Pay;
import com.bmstu.paymentservice.repositories.PayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PayService {
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
        return payRepository.findPayByBookingId(bookingId);
    }

    public Pay getByUserIdAndBookingId(Long userId, Long bookingId){
        return payRepository.findPayByUserIdAndAndBookingId(userId, bookingId);
    }

    public Boolean create(Pay pay){
        if(getByBookingId(pay.getBookingId()) == null){
            payRepository.save(pay);
            return true;
        }
        return false;
    }
}
