package com.examly.springapp.repository;

import com.examly.springapp.model.user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface userRepository extends JpaRepository<user, Integer> 
{
    boolean existsByEmail(String email);
    List<user> findByFirstNameAndEmail(String firstName, String email); 
}
