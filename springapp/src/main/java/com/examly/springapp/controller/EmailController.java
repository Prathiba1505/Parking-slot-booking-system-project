package com.examly.springapp.controller;

import com.examly.springapp.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public ResponseEntity<Map<String, String>> sendEmail(@RequestBody Map<String, Object> request) {
        String email = (String) request.get("email");

        Map<String, Object> bookingDetails = (Map<String, Object>) request.get("bookingDetails");
        Map<String, String> bookingDetailsStr = bookingDetails.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> e.getValue() != null ? e.getValue().toString() : ""
                ));
        emailService.sendBookingConfirmation(email, bookingDetailsStr);
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Email sent successfully to " + email);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/send-signup-success")
    public ResponseEntity<Map<String, String>> sendSignupSuccess(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String username = request.getOrDefault("username", "User");

        emailService.sendSignupSuccessEmail(email, username);

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Signup success email sent to " + email);

        return ResponseEntity.ok(response);
    }
}
