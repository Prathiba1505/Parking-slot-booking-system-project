package com.examly.springapp.controller;

import com.examly.springapp.model.bookingHistory;
import com.examly.springapp.service.bookingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/booking-history")
public class bookingHistoryController {

    @Autowired
    private bookingHistoryService bookingHistoryService;

    @GetMapping
    public List<bookingHistory> getAllHistories() {
        return bookingHistoryService.getAllHistories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHistoryById(@PathVariable int id) {
        Optional<bookingHistory> history = bookingHistoryService.getHistoryById(id);
        return history.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/booking/{bookingId}")
    public List<bookingHistory> getHistoriesByBookingId(@PathVariable int bookingId) {
        return bookingHistoryService.getHistoriesByBookingId(bookingId);
    }

    @PostMapping
    public ResponseEntity<bookingHistory> createHistory(@RequestBody bookingHistory history) {
        bookingHistory saved = bookingHistoryService.saveHistory(history);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHistory(@PathVariable int id) {
        bookingHistoryService.deleteHistory(id);
        return ResponseEntity.ok("History record deleted.");
    }
}
