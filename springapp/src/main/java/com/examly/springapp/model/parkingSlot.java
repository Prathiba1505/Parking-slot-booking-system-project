package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class parkingSlot 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int slotId;

    @Column(length = 10, nullable = false, unique = true)
    private String slotNumber;

    @Enumerated(EnumType.STRING)
    @Column(length = 30, nullable = false)
    private SlotType slotType;

    @Column(nullable = false)
    private double hourlyRate;

    @JsonProperty("isAvailable")
    @Column(nullable = false)
    private boolean isAvailable = true;

    @Column(nullable = false)
    private int facilityId;  

    @Column(length = 100)
    private String location;

    @Column(columnDefinition = "INT DEFAULT 1")
    private int floor = 1;

    @Column(length = 10)
    private String section;

    @Column(length = 50)
    private String coordinates;

    @Column(columnDefinition = "JSON")
    private String features;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private LocalDateTime lastModified;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
        this.lastModified = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.lastModified = LocalDateTime.now();
    }


    @OneToMany(mappedBy = "parkingSlot", cascade = CascadeType.ALL)
    @JsonManagedReference("slot-bookings")
    private List<booking> bookings;

    public enum SlotType {
        REGULAR,
        VIP,
        HANDICAPPED,
        ELECTRIC_VEHICLE,
        DEFAULT_REGULAR
    }

    public int getSlotId() 
    {
         return slotId;
    }
    public void setSlotId(int slotId)
    {
         this.slotId = slotId;
    }

    public String getSlotNumber() 
    {
         return slotNumber; 
    }
    public void setSlotNumber(String slotNumber) 
    {
         this.slotNumber = slotNumber; 
    }

    public SlotType getSlotType() 
    {
         return slotType; 
    }
    public void setSlotType(SlotType slotType) 
    {
         this.slotType = slotType; 
    }

    public double getHourlyRate() 
    {
         return hourlyRate; 
    }
    public void setHourlyRate(double hourlyRate) 
    {
         this.hourlyRate = hourlyRate; 
    }

    public boolean isAvailable() 
    {
         return isAvailable; 
    }
    public void setAvailable(boolean available) 
    {
         isAvailable = available; 
    }

    public int getFacilityId() 
    {
         return facilityId; 
    }
    public void setFacilityId(int facilityId) 
    {
         this.facilityId = facilityId; 
    }

    public String getLocation() 
    {
         return location; 
    }
    public void setLocation(String location) 
    {
         this.location = location; 
    }

    public int getFloor() 
    {
         return floor; 
    }
    public void setFloor(int floor) 
    {
         this.floor = floor;
    }

    public String getSection() 
    {
         return section; 
    }
    public void setSection(String section) 
    {
         this.section = section; 
    }

    public String getCoordinates() 
    {
         return coordinates; 
    }
    public void setCoordinates(String coordinates) 
    {
         this.coordinates = coordinates; 
    }

    public String getFeatures() 
    {
         return features; 
    }
    public void setFeatures(String features) 
    {
         this.features = features; 
    }

    public LocalDateTime getCreatedDate() 
    {
         return createdDate; 
    }
    public void setCreatedDate(LocalDateTime createdDate) 
    {
         this.createdDate = createdDate; 
    }

    public LocalDateTime getLastModified() 
    {
         return lastModified; 
    }
    public void setLastModified(LocalDateTime lastModified) 
    {
         this.lastModified = lastModified; 
    }

    public List<booking> getBookings() 
    {
         return bookings; 
    }
    public void setBookings(List<booking> bookings) 
    {
         this.bookings = bookings; 
    }
}
