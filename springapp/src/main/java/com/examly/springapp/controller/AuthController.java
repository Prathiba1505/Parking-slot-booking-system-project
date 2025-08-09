package com.examly.springapp.controller;

import com.examly.springapp.model.user;
import com.examly.springapp.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow frontend requests from all origins
public class AuthController {

    @Autowired
    private userRepository userRepository;

    // ✅ LOGIN
    @PostMapping("/login")
public user login(@RequestBody LoginRequest request) {
    System.out.println("Login attempt: " + request.getEmail() + ", " + request.getPassword());

    Optional<user> userOpt = userRepository
            .findAll()
            .stream()
            .filter(u -> u.getEmail().equals(request.getEmail()))
            .findFirst();

    if (userOpt.isEmpty()) {
        throw new RuntimeException("User not found");
    }

    user foundUser = userOpt.get();

    if (!foundUser.getPasswordHash().equals(request.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    return foundUser;
}


    // ✅ SIGNUP
    @PostMapping("/signup")
    public user signup(@RequestBody user newUser) {
        Optional<user> existingUser = userRepository
                .findAll()
                .stream()
                .filter(u -> u.getEmail().equals(newUser.getEmail()))
                .findFirst();

        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists with this email");
        }

        // 🚨 Make sure to use setPasswordHash() here
        if (newUser.getPasswordHash() == null || newUser.getPasswordHash().isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }

        return userRepository.save(newUser);
    }

    // ✅ Inner class for login request
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
