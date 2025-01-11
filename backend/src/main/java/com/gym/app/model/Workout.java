package com.gym.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "workouts")
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "UserId is required")
    @Column(nullable = false)
    private Long userId;
    
    @NotNull(message = "Type is required")
    @Column(nullable = false)
    private String type;
    
    @NotNull(message = "Duration is required")
    @Column(nullable = false)
    private Integer duration;
    
    @NotNull(message = "Date is required")
    @Column(nullable = false)
    private LocalDateTime date;

    // Default constructor
    public Workout() {}
    
    // Constructor with all fields
    public Workout(Long userId, String type, Integer duration, LocalDateTime date) {
        this.userId = userId;
        this.type = type;
        this.duration = duration;
        this.date = date;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    @PrePersist
    protected void onCreate() {
        if (date == null) {
            date = LocalDateTime.now();
        }
    }

    @Override
    public String toString() {
        return "Workout{" +
                "id=" + id +
                ", userId=" + userId +
                ", type='" + type + '\'' +
                ", duration=" + duration +
                ", date=" + date +
                '}';
    }
}
