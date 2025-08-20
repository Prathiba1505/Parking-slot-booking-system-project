package com.examly.springapp.controller;

import com.examly.springapp.model.user;
import com.examly.springapp.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private userRepository userRepository;
    @PostMapping("/login")
    public user login(@RequestBody LoginRequest request) {
        Optional<user> userOpt = userRepository.findAll().stream()
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

    @PostMapping("/signup")
    public user signup(@RequestBody user newUser) {
        Optional<user> existingUser = userRepository.findAll().stream()
                .filter(u -> u.getEmail().equals(newUser.getEmail()))
                .findFirst();

        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists with this email");
        }

        if (newUser.getPasswordHash() == null || newUser.getPasswordHash().isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }
        if (newUser.getRole() == null) {
            newUser.setRole(user.Role.USER);
        }

        return userRepository.save(newUser);
    }

    public static class LoginRequest {
        private String email;
        private String password;
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}