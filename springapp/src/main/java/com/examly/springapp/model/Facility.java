package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long facilityId;

    @Column(nullable = false, length = 100)
    private String facilityName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false, length = 50)
    private String city;

    @Column(nullable = false, length = 50)
    private String state;

    @Column(nullable = false, length = 10)
    private String zipCode;

    @Column(nullable = false)
    private int totalSlots;

    @Column(length = 100)
    private String operatingHours;

    @Column(length = 100)
    private String contactInfo;

    @Column(nullable = false)
    private Long managerId;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }
}
