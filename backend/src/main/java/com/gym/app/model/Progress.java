package com.gym.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "progress")
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long userId;

    @NotNull
    private LocalDate date;

    private Double weight;
    private Double bodyFat;
    private Double muscleGain;
    private String measurements;
    private String notes;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public Double getBodyFat() { return bodyFat; }
    public void setBodyFat(Double bodyFat) { this.bodyFat = bodyFat; }

    public Double getMuscleGain() { return muscleGain; }
    public void setMuscleGain(Double muscleGain) { this.muscleGain = muscleGain; }

    public String getMeasurements() { return measurements; }
    public void setMeasurements(String measurements) { this.measurements = measurements; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
