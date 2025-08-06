package com.examly.springapp.controller;

import com.examly.springapp.model.user;
import com.examly.springapp.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class userController 
{

    @Autowired
    private userService userService;

    @GetMapping
    public Page<user> getAllUsers(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size,
                                  @RequestParam(defaultValue = "userId") String sortBy,
                                  @RequestParam(defaultValue = "asc") String direction) 
    {
        return userService.getAllUsers(page, size, sortBy, direction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) 
    {
        Optional<user> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody user user) 
    {
        user savedUser = userService.saveUser(user);
        if (savedUser == null) {
            return ResponseEntity.badRequest().body("User with this email already exists.");
        }
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody user user) 
    {
        user updatedUser = userService.updateUser(id, user);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) 
    {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully.");
    }

    @GetMapping("/find")
    public List<user> findByFirstNameAndEmail(@RequestParam String firstName,
                                              @RequestParam String email) 
    {
        return userService.findByFirstNameAndEmail(firstName, email);
    }
}
