package com.examly.springapp.repository;

import com.examly.springapp.model.booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface bookingRepository extends JpaRepository<booking, Integer> 
{
    List<booking> findByUserId(int userId);
}