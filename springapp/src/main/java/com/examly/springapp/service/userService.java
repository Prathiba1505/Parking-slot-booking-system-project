package com.examly.springapp.service;

import com.examly.springapp.model.user;
import com.examly.springapp.model.user.Role;
import com.examly.springapp.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class userService {

    @Autowired
    private userRepository userRepository;

    public Page<user> getAllUsers(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return userRepository.findAll(pageable);
    }

    public Optional<user> getUserById(int id) {
        return userRepository.findById(id);
    }

    public user saveUser(user user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return null;
        }
        return userRepository.save(user);
    }

    public user updateUser(int id, user user) {
        Optional<user> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            user updatedUser = existingUser.get();
            updatedUser.setFirstName(user.getFirstName());
            updatedUser.setLastName(user.getLastName());
            updatedUser.setUsername(user.getUsername());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPasswordHash(user.getPasswordHash());
            updatedUser.setPhone(user.getPhone());
            updatedUser.setRole(user.getRole());
            return userRepository.save(updatedUser);
        }
        return null;
    }

    public List<user> findByFirstNameAndEmail(String firstName, String email) {
        return userRepository.findByFirstNameAndEmail(firstName, email);
    }

    public List<user> findByRole(Role role) {
        return userRepository.findByRole(role);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}