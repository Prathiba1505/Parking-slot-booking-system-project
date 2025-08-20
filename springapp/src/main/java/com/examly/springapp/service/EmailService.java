package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Sends a professional booking confirmation email
     * @param recipientEmail Email of the user
     * @param bookingDetails Map containing booking info
     */
    public void sendBookingConfirmation(String recipientEmail, Map<String, String> bookingDetails) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Parking Slot Booking Confirmation");
        
        StringBuilder emailBody = new StringBuilder();
        emailBody.append("Dear ").append(bookingDetails.getOrDefault("name", "Customer")).append(",\n\n");
        emailBody.append("Thank you for booking your parking slot with us. Here are your booking details:\n\n");
        
        emailBody.append("--------------------------------------------------\n");
        emailBody.append("Name: ").append(bookingDetails.getOrDefault("name", "-")).append("\n");
        emailBody.append("Vehicle Number: ").append(bookingDetails.getOrDefault("vehicleNo", "-")).append("\n");
        emailBody.append("Vehicle Type: ").append(bookingDetails.getOrDefault("vehicleType", "-")).append("\n");
        emailBody.append("Slot Number: ").append(bookingDetails.getOrDefault("slotNumber", "-")).append("\n");
        emailBody.append("Date: ").append(bookingDetails.getOrDefault("date", "-")).append("\n");
        emailBody.append("Time: ").append(bookingDetails.getOrDefault("time", "-")).append("\n");
        emailBody.append("Duration: ").append(bookingDetails.getOrDefault("duration", "-")).append("\n");
        emailBody.append("Contact: ").append(bookingDetails.getOrDefault("contact", "-")).append("\n");
        emailBody.append("--------------------------------------------------\n\n");

        emailBody.append("Please keep this email for your reference.\n");
        emailBody.append("We look forward to serving you!\n\n");
        emailBody.append("Best regards,\n");
        emailBody.append("Parking Management Team");

        message.setText(emailBody.toString());

        mailSender.send(message);
    }
}
