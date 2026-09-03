package com.motorenter.motorenter.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    //private static int counter = 0;
    private int id;
    private String userName;
    private String lastName;
    private String firstName;
    private String phoneNumber;
    private String email;
    private String password;
    private LocalDate createdAt;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String userName, String lastName, String firstName, String phoneNumber, String email, String password, Role role){
        //this.id = ++counter;
        this.createdAt = LocalDate.now();
        this.userName = userName;
        this.lastName = lastName;
        this.firstName = firstName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    protected User() {}

    public String getUserName() {
        return userName;
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
