package com.motorenter.motorenter;

import java.time.LocalDate;

public class User {
    private static int counter = 0;
    private int id;
    private String name;
    private String phoneNumber;
    private String email;
    private String password;
    private LocalDate createdAt;
    private Role role;

    public User(String name, String phoneNumber, String email, String password, Role role){
        this.id = ++counter;
        this.createdAt = LocalDate.now();
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
