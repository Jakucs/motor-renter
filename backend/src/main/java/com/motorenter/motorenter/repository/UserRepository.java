package com.motorenter.motorenter.repository;

import com.motorenter.motorenter.model.Role;
import com.motorenter.motorenter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email); // we can find the exact user by email
    List<User> findByRoleAndIsActive(Role role, Boolean isActive);
}
