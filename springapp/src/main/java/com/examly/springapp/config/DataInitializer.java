package com.examly.springapp.config;

import com.examly.springapp.model.user;
import com.examly.springapp.model.user.Role;
import com.examly.springapp.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private userRepository userRepository;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@example.com")) {

            user admin = new user();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPasswordHash("admin123");

            admin.setFirstName("System");
            admin.setLastName("Admin");
            admin.setPhone("0000000000");
            admin.setRole(Role.SYSTEM_ADMIN);
            admin.setActive(true);

            userRepository.save(admin);
            System.out.println("✅ Default admin created: admin@example.com / admin123");
        }
    }
}
