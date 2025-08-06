package com.examly.springapp.service;

import com.examly.springapp.model.Facility;
import com.examly.springapp.model.FacilityAnalytics;
import com.examly.springapp.repository.FacilityAnalyticsRepository;
import com.examly.springapp.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityAnalyticsService {

    @Autowired
    private FacilityAnalyticsRepository analyticsRepository;

    @Autowired
    private FacilityRepository facilityRepository;

    public FacilityAnalytics addAnalytics(FacilityAnalytics analytics) {
        Long facilityId = analytics.getFacility().getFacilityId();
        Facility facility = facilityRepository.findById(facilityId)
                .orElseThrow(() -> new RuntimeException("Facility not found with ID: " + facilityId));
        analytics.setFacility(facility);
        return analyticsRepository.save(analytics);
    }

    public List<FacilityAnalytics> getAllAnalytics() {
        return analyticsRepository.findAll();
    }

    public Optional<FacilityAnalytics> getAnalyticsById(Long id) {
        return analyticsRepository.findById(id);
    }

    public FacilityAnalytics updateAnalytics(Long id, FacilityAnalytics updatedAnalytics) {
        return analyticsRepository.findById(id).map(analytics -> {
            Facility facility = facilityRepository.findById(updatedAnalytics.getFacility().getFacilityId())
                    .orElseThrow(() -> new RuntimeException("Facility not found"));
            analytics.setFacility(facility);
            analytics.setDate(updatedAnalytics.getDate());
            analytics.setTotalBookings(updatedAnalytics.getTotalBookings());
            analytics.setOccupancyRate(updatedAnalytics.getOccupancyRate());
            analytics.setRevenue(updatedAnalytics.getRevenue());
            analytics.setAverageBookingDuration(updatedAnalytics.getAverageBookingDuration());
            analytics.setPeakHours(updatedAnalytics.getPeakHours());
            analytics.setUtilizationScore(updatedAnalytics.getUtilizationScore());
            return analyticsRepository.save(analytics);
        }).orElse(null);
    }

    public void deleteAnalytics(Long id) {
        analyticsRepository.deleteById(id);
    }
}
