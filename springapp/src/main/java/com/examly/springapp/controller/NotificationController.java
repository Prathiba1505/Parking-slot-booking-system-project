package com.examly.springapp.controller;

import com.examly.springapp.model.Notification;
import com.examly.springapp.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "*")
public class NotificationController 
{

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) 
    {
        return notificationService.addNotification(notification);
    }

    @GetMapping
    public List<Notification> getAllNotifications() 
    {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Optional<Notification> getNotificationById(@PathVariable Long id) 
    {
        return notificationService.getNotificationById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUser(@PathVariable Long userId) 
    {
        return notificationService.getNotificationsByUserId(userId);
    }

    @PutMapping("/{id}")
    public Notification updateNotification(@PathVariable Long id, @RequestBody Notification notification) 
    {
        return notificationService.updateNotification(id, notification);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable Long id) 
    {
        notificationService.deleteNotification(id);
    }
}
