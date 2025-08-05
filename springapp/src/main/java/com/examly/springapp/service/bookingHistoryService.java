package com.examly.springapp.service;

import com.examly.springapp.model.bookingHistory;
import com.examly.springapp.repository.bookingHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class bookingHistoryService {

    @Autowired
    private bookingHistoryRepository bookingHistoryRepository;

    public List<bookingHistory> getAllHistories() {
        return bookingHistoryRepository.findAll();
    }

    public Optional<bookingHistory> getHistoryById(int id) {
        return bookingHistoryRepository.findById(id);
    }

    public List<bookingHistory> getHistoriesByBookingId(int bookingId) {
        return bookingHistoryRepository.findByBookingId(bookingId);
    }

    public bookingHistory saveHistory(bookingHistory history) {
        return bookingHistoryRepository.save(history);
    }

    public void deleteHistory(int id) {
        bookingHistoryRepository.deleteById(id);
    }
}
