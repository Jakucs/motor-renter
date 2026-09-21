package com.motorenter.motorenter.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_contact_history")
public class UserContactHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String fieldName; // "email" vagy "phoneNumber"
    private String oldValue;
    private LocalDateTime changedAt;

    public UserContactHistory() {}

    public UserContactHistory(User user, String fieldName, String oldValue) {
        this.user = user;
        this.fieldName = fieldName;
        this.oldValue = oldValue;
        this.changedAt = LocalDateTime.now();
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }
}