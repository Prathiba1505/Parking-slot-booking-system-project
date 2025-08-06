package com.examly.springapp.repository;

import com.examly.springapp.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> 
{
    List<Vehicle> findByUserId(int userId);
}
