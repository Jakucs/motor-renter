package com.motorenter.motorenter.controller;

import com.motorenter.motorenter.dto.ActiveDriverDTO;
import com.motorenter.motorenter.dto.GoogleAuthRequest;
import com.motorenter.motorenter.dto.LoginResponse;
import com.motorenter.motorenter.dto.RidingGearRequest;
import com.motorenter.motorenter.model.Role;
import com.motorenter.motorenter.model.User;
import com.motorenter.motorenter.service.JwtService;
import com.motorenter.motorenter.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody User user) {
        User loggedInUser = userService.login(user.getEmail(), user.getPassword());
        String token = jwtService.generateToken(loggedInUser);
        return new LoginResponse(token, loggedInUser.getId(), loggedInUser.getRole().name());
    }

    @PostMapping("/auth/google")
    public LoginResponse googleAuth(@RequestBody GoogleAuthRequest request) {
        User user = userService.loginOrRegisterWithGoogle(request.getToken());
        String token = jwtService.generateToken(user);
        return new LoginResponse(token, user.getId(), user.getRole().name());
    }

    @GetMapping("/profile")
    public User getProfile(@AuthenticationPrincipal Integer userId){
        return userService.getUserById(userId);
    }

    @PutMapping("/profile")
    public User updateProfile(@AuthenticationPrincipal Integer userId, @RequestBody User updatedUser) {
        return userService.updatePhone(userId, updatedUser.getPhoneNumber());
    }

    @PutMapping("/profile/role")
    public User updateRole(@AuthenticationPrincipal Integer userId, @RequestBody Map<String, String> body){
        String role = body.get("role");
        return userService.updateRole(userId, Role.valueOf(role));
    }

    @PostMapping("/profile/upload-picture")
    public User uploadProfilePicture(
            @AuthenticationPrincipal Integer userId,
            @RequestParam("file") MultipartFile file) throws IOException {
        return userService.uploadProfilePicture(userId, file);
    }

    @PutMapping("/profile/riding-gear")
    public User updateRidingGear(@AuthenticationPrincipal Integer userId, @RequestBody RidingGearRequest request) {
        return userService.updateRidingGear(userId, request);
    }

    @PutMapping("/profile/active")
    public User updateActive(@AuthenticationPrincipal Integer userId, @RequestBody Map<String, Boolean> body){
        Boolean isActive = body.get("isActive");
        return userService.updateActive(userId, isActive);
    }

    @PutMapping("/profile/location")
    public User updateLocation(@AuthenticationPrincipal Integer userId, @RequestBody Map<String, Double> body) {
        Double lat = body.get("lat");
        Double lng = body.get("lng");
        return userService.updateLocation(userId, lat, lng);
    }

    @GetMapping("/drivers/active")
    public List<ActiveDriverDTO> getActiveDrivers() {
        return userService.getActiveDrivers();
    }
}
