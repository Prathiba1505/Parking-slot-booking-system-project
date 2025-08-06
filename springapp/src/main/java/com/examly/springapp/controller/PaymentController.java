package com.examly.springapp.controller;

import com.examly.springapp.model.Payment;
import com.examly.springapp.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController 
{

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) 
    {
        return paymentService.createPayment(payment);
    }

    @GetMapping
    public List<Payment> getAllPayments() 
    {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) 
    {
        return paymentService.getPaymentById(id);
    }

    @GetMapping("/transaction/{transactionId}")
    public Payment getByTransactionId(@PathVariable String transactionId) 
    {
        return paymentService.getPaymentByTransactionId(transactionId);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) 
    {
        paymentService.deletePayment(id);
    }
}
