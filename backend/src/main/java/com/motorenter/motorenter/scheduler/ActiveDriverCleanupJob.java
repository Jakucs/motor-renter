package com.motorenter.motorenter.scheduler;

import com.motorenter.motorenter.model.Role;
import com.motorenter.motorenter.model.User;
import com.motorenter.motorenter.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ActiveDriverCleanupJob {

    private final UserRepository userRepository;

    public ActiveDriverCleanupJob(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Scheduled(fixedRate = 30000) // 30 másodpercenként fut
    public void deactivateStaleDrivers() {
        LocalDateTime cutoff = LocalDateTime.now().minusSeconds(60);

        List<User> staleDrivers = userRepository.findByRoleAndIsActive(Role.DRIVER, true)
                .stream()
                .filter(u -> u.getLastSeenAt() == null || u.getLastSeenAt().isBefore(cutoff))
                .toList();

        for (User user : staleDrivers) {
            user.setActive(false);
        }

        if (!staleDrivers.isEmpty()) {
            userRepository.saveAll(staleDrivers);
        }
    }
}