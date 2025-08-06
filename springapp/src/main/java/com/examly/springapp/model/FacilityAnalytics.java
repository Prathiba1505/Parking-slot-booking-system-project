package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacilityAnalytics 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long analyticsId;

    @ManyToOne
    @JoinColumn(name = "facilityId", nullable = false)
    private Facility facility;

    @Column(nullable = false)
    private LocalDate date = LocalDate.now();

    @Column(nullable = false)
    private int totalBookings = 0;

    @Column(nullable = false)
    private Double occupancyRate = 0.0;

    @Column(nullable = false)
    private Double revenue = 0.0;

    @Column(name = "averageBookingDuration", nullable = false)
    private Double averageBookingDuration = 0.0;

    @Column(length = 100)
    private String peakHours;

    @Column(nullable = false)
    private Double utilizationScore = 0.0;
}
