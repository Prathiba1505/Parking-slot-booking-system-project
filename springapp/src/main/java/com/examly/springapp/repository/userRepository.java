package com.examly.springapp.repository;

import com.examly.springapp.model.user;
import com.examly.springapp.model.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface userRepository extends JpaRepository<user, Integer> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    List<user> findByFirstNameAndEmail(String firstName, String email);
    Optional<user> findByEmailAndPasswordHash(String email, String passwordHash);
    List<user> findByRole(Role role); // extra method for admins
}
