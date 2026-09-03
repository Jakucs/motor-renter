package com.motorenter.motorenter.service;

import com.motorenter.motorenter.model.User;
import com.motorenter.motorenter.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User register(User user){
        return userRepository.save(user);
    }
}
