package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private user user;

    @Column(nullable = false, length = 20)
    private String licensePlate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleType vehicleType = VehicleType.CAR;

    @Column(length = 50)
    private String make;

    @Column(length = 50)
    private String model;

    @Column(length = 30)
    private String color;

    private Integer year;

    @Column(nullable = false)
    private Boolean isDefault = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }

    public enum VehicleType {
        CAR, MOTORCYCLE, TRUCK, VAN
    }
}
