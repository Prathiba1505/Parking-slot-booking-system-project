package com.examly.springapp.controller;

import com.examly.springapp.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
private EmailService emailService;

@PostMapping("/send-email")
public String sendEmail(@RequestBody Map<String, Object> request) {
    String email = (String) request.get("email");
    
    Map<String, Object> bookingDetails = (Map<String, Object>) request.get("bookingDetails");
    Map<String, String> bookingDetailsStr = bookingDetails.entrySet().stream()
            .collect(Collectors.toMap(
                e -> e.getKey(),
                e -> e.getValue() != null ? e.getValue().toString() : ""
            ));

    emailService.sendBookingConfirmation(email, bookingDetailsStr);
    return "Email sent successfully!";
}


}
