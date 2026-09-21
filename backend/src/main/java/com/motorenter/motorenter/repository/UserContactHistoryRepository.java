package com.motorenter.motorenter.repository;

import com.motorenter.motorenter.model.UserContactHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserContactHistoryRepository extends JpaRepository<UserContactHistory, Integer> {
    List<UserContactHistory> findByUserIdOrderByChangedAtDesc(int userId);
}