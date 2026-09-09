package com.motorenter.motorenter.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import com.motorenter.motorenter.model.Role;
import com.motorenter.motorenter.model.User;
import com.motorenter.motorenter.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${google.client.id}")
    private String googleClientId;

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

    public User loginOrRegisterWithGoogle(String idTokenString) {
        System.out.println("Google Client ID: " + googleClientId);
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) {
                throw new RuntimeException("Érvénytelen Google token!");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String firstName = (String) payload.get("given_name");
            String lastName = (String) payload.get("family_name");

            return userRepository.findByEmail(email)
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setEmail(email);
                        newUser.setFirstName(firstName);
                        newUser.setLastName(lastName);
                        newUser.setUserName(email.split("@")[0]);
                        newUser.setPassword(null);
                        newUser.setRole(Role.PASSENGER);
                        newUser.setCreatedAt(LocalDate.now());
                        return userRepository.save(newUser);
                    });

        } catch (Exception e) {
            throw new RuntimeException("Google bejelentkezés sikertelen: " + e.getMessage());
        }
    }

}
