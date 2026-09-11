package com.motorenter.motorenter.controller;

import com.motorenter.motorenter.dto.GoogleAuthRequest;
import com.motorenter.motorenter.model.Role;
import com.motorenter.motorenter.model.User;
import com.motorenter.motorenter.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user.getEmail(), user.getPassword());
    }

    @PostMapping("/auth/google")
    public User googleAuth(@RequestBody GoogleAuthRequest request) {
        return userService.loginOrRegisterWithGoogle(request.getToken());
    }

    @GetMapping("/profile/{id}")
    public User getProfile(@PathVariable Integer id){
        return userService.getUserById(id);
    }

    @PutMapping("/profile/{id}")
    public User updateProfile(@PathVariable Integer id, @RequestBody User updatedUser) {
        return userService.updatePhone(id, updatedUser.getPhoneNumber());
    }

    @PutMapping("/profile/{id}/role")
    public User updateRole(@PathVariable Integer id, @RequestBody Map<String, String> body){
        String role = body.get("role");
        return userService.updateRole(id, Role.valueOf(role));
    }

    @PostMapping("/profile/{id}/upload-picture")
    public User uploadProfilePicture(
            @PathVariable int id,
            @RequestParam("file") MultipartFile file) throws IOException {
        return userService.uploadProfilePicture(id, file);
    }
}
