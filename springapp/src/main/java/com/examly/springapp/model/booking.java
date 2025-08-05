package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String vehicleNumber;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private double totalCost;

    private String status; 
    @ManyToOne
@JoinColumn(name = "user_id")
@JsonBackReference("user-bookings")
private user user;

    @ManyToOne
    @JoinColumn(name = "parking_slot_id")
    @JsonBackReference("slot-bookings")
    private parkingSlot parkingSlot;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
@JsonManagedReference("booking-history")
private List<bookingHistory> history;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public user getUser() {
        return user;
    }

    public void setUser(user user) {
        this.user = user;
    }

    public parkingSlot getParkingSlot() {
        return parkingSlot;
    }

    public void setParkingSlot(parkingSlot parkingSlot) {
        this.parkingSlot = parkingSlot;
    }
    public List<bookingHistory> getHistory() { return history; }
public void setHistory(List<bookingHistory> history) { this.history = history; }
}
