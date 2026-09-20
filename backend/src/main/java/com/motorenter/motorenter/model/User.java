package com.motorenter.motorenter.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    //private static int counter = 0;
    private int id;
    @Column(unique = true)
    private String userName;
    private String lastName;
    private String firstName;
    private String phoneNumber;
    @Column(unique = true)
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password; //google bejelentkezés miatt lehet null is
    private LocalDate createdAt;
    private String profilePictureUrl;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(columnDefinition = "boolean default false")
    private Boolean hasHelmet;
    @Column(columnDefinition = "boolean default false")
    private Boolean hasProtectiveGear;
    @Column(columnDefinition = "boolean default false")
    private Boolean isActive;
    private Double lat;
    private Double lng;
    @Column
    private LocalDateTime lastSeenAt;

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

    public User() {}

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

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDateTime getLastSeenAt() {
        return lastSeenAt;
    }

    public void setLastSeenAt(LocalDateTime lastSeenAt) {
        this.lastSeenAt = lastSeenAt;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Boolean getHasHelmet() {
        return hasHelmet;
    }

    public void setHasHelmet(Boolean hasHelmet) {
        this.hasHelmet = hasHelmet;
    }

    public Boolean getHasProtectiveGear() {
        return hasProtectiveGear;
    }

    public void setHasProtectiveGear(Boolean hasProtectiveGear) {
        this.hasProtectiveGear = hasProtectiveGear;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}
