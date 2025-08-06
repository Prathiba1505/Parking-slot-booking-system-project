package com.examly.springapp.service;

import com.examly.springapp.model.Notification;
import com.examly.springapp.model.user;
import com.examly.springapp.repository.NotificationRepository;
import com.examly.springapp.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private userRepository userRepository;

    public Notification addNotification(Notification notification) {
    int userId = notification.getUser().getUserId();
    user u = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    notification.setUser(u);
    return notificationRepository.save(notification);
}


    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    public Notification updateNotification(Long id, Notification updatedNotification) {
        return notificationRepository.findById(id).map(notification -> {
            notification.setMessage(updatedNotification.getMessage());
            notification.setType(updatedNotification.getType());
            notification.setPriority(updatedNotification.getPriority());
            notification.setRelatedEntityType(updatedNotification.getRelatedEntityType());
            notification.setRelatedEntityId(updatedNotification.getRelatedEntityId());
            notification.setIsRead(updatedNotification.getIsRead());
            return notificationRepository.save(notification);
        }).orElse(null);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}
