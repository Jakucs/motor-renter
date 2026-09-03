package com.motorenter.motorenter.repository;

import com.motorenter.motorenter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
