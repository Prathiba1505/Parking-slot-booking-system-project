package com.examly.springapp.controller;

import com.examly.springapp.model.booking;
import com.examly.springapp.service.bookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class bookingController 
{
    @Autowired
    private bookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody booking b,
                                           @RequestParam int userId,
                                           @RequestParam int parkingSlotId) 
    {
        booking result = bookingService.createBooking(b, userId, parkingSlotId);
        if (result == null) 
        {
            return ResponseEntity.badRequest().body("Invalid booking data or slot unavailable.");
        }
        return ResponseEntity.status(201).body(result);
    }

    @GetMapping
    public List<booking> getAllBookings() 
    {
        return bookingService.getAllBookings();
    }

    @GetMapping("/user/{userId}")
    public List<booking> getUserBookings(@PathVariable int userId) 
    {
        return bookingService.getBookingsByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable int id) 
    {
        Optional<booking> bookingOpt = bookingService.getBookingById(id);
        return bookingOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable int id) 
    {
        booking b = bookingService.cancelBooking(id);
        if (b == null) {
            return ResponseEntity.badRequest().body("Booking not found or already cancelled.");
        }
        return ResponseEntity.ok(b);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectBooking(@PathVariable int id) 
    {
        booking b = bookingService.rejectBooking(id);
        if (b == null) {
            return ResponseEntity.badRequest().body("Booking not found or already rejected.");
        }
        return ResponseEntity.ok(b);
    }
}