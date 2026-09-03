package com.motorenter.motorenter.service;

import com.motorenter.motorenter.model.User;
import com.motorenter.motorenter.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User register(User user){
        return userRepository.save(user);
    }

    public User login(String email, String password){
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new RuntimeException("Nem található felhasználó!");
        }

        if (!user.get().getPassword().equals(password)) {
            throw new RuntimeException("Hibás jelszó!");
        }

        return user.get();
    }
}
