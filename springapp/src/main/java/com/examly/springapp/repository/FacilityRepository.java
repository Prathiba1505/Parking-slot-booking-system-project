package com.examly.springapp.repository;

import com.examly.springapp.model.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
}
