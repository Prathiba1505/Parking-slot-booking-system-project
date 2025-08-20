package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class user {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String passwordHash;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(length = 15)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private Role role;

    private boolean isActive = true;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime registrationDate;

    private LocalDateTime lastLogin;

    private boolean emailVerified = false;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference("user-bookings")
    private List<booking> bookings;

    @OneToMany(mappedBy = "changedBy", cascade = CascadeType.ALL)
    @JsonManagedReference("user-histories")
    private List<bookingHistory> bookingHistories;

    public enum Role {
        USER,
        SECURITY,
        FACILITY_MANAGER,
        SYSTEM_ADMIN,
        DEFAULT_USER
    }

    public int getUserId() 
    {
         return id; 
    }
    public void setUserId(int userId) 
    {
         this.id = userId; 
    }

    public String getUsername() 
    {
         return username; 
    }
    public void setUsername(String username) 
    {
         this.username = username; 
    }

    public String getEmail() 
    {
         return email; 
    }
    public void setEmail(String email) 
    {
         this.email = email; 
    }

    public String getPasswordHash() 
    {
         return passwordHash; 
    }
    public void setPasswordHash(String passwordHash) 
    {
         this.passwordHash = passwordHash; 
    }

    public String getFirstName() 
    {
         return firstName; 
    }
    public void setFirstName(String firstName) 
    {
         this.firstName = firstName; 
    }

    public String getLastName() 
    {
         return lastName; 
    }
    public void setLastName(String lastName) 
    {
         this.lastName = lastName; 
    }

    public String getPhone() 
    {
         return phone; 
    }
    public void setPhone(String phone) 
    {
         this.phone = phone; 
    }

    public Role getRole() 
    {
         return role; 
    }
    public void setRole(Role role) 
    {
         this.role = role; 
    }

    public boolean isActive() 
    {
         return isActive; 
    }
    public void setActive(boolean isActive) 
    {
         this.isActive = isActive; 
    }

    public LocalDateTime getRegistrationDate() 
    {
         return registrationDate; 
    }
    public void setRegistrationDate(LocalDateTime registrationDate) 
    {
         this.registrationDate = registrationDate; 
    }

    public LocalDateTime getLastLogin() 
    {
         return lastLogin; 
    }
    public void setLastLogin(LocalDateTime lastLogin) 
    {
         this.lastLogin = lastLogin; 
    }

    public boolean isEmailVerified() 
    {
         return emailVerified; 
    }
    public void setEmailVerified(boolean emailVerified) 
    {
         this.emailVerified = emailVerified; 
    }

    public List<booking> getBookings() 
    {
         return bookings; 
    }
    public void setBookings(List<booking> bookings) 
    {
         this.bookings = bookings; 
    }

    public List<bookingHistory> getBookingHistories() 
    {
         return bookingHistories; 
    }
    public void setBookingHistories(List<bookingHistory> bookingHistories) 
    {
         this.bookingHistories = bookingHistories; 
    }
}