package com.motorenter.motorenter.service;

import com.motorenter.motorenter.model.User;
import com.motorenter.motorenter.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user){
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public User login(String email, String password){
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new RuntimeException("Nem található felhasználó!");
        }

        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            throw new RuntimeException("Hibás jelszó!");
        }

        return user.get();
    }
}
