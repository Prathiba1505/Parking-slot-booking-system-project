package com.examly.springapp.repository;

import com.examly.springapp.model.parkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParkingSlotRepository extends JpaRepository<parkingSlot, Integer> 
{
    boolean existsBySlotNumber(String slotNumber);
    List<parkingSlot> findByIsAvailable(boolean isAvailable);
}