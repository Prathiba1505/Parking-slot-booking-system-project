package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private user user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type = NotificationType.ALERT;

    @Column(nullable = false)
    private Boolean isRead = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority = Priority.MEDIUM;

    @Column(length = 50)
    private String relatedEntityType;

    @Column(length = 50)
    private String relatedEntityId;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }

    public enum NotificationType {
        BOOKING_CONFIRMATION, PAYMENT_SUCCESS, REMINDER, ALERT
    }

    public enum Priority {
        LOW, MEDIUM, HIGH, URGENT
    }
}
