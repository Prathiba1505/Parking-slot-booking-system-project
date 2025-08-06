package com.examly.springapp.repository;

import com.examly.springapp.model.bookingHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface bookingHistoryRepository extends JpaRepository<bookingHistory, Integer> 
{
    List<bookingHistory> findByBookingId(int bookingId);
}
