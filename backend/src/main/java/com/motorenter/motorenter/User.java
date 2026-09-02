package com.motorenter.motorenter;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    //private static int counter = 0;
    private int id;
    private String name;
    private String phoneNumber;
    private String email;
    private String password;
    private LocalDate createdAt;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String name, String phoneNumber, String email, String password, Role role){
        //this.id = ++counter;
        this.createdAt = LocalDate.now();
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    protected User() {}

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public Role getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}
