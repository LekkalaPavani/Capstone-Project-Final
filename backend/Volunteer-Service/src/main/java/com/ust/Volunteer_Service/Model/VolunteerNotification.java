package com.ust.Volunteer_Service.Model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ust.Incident_Management_System.Model.IncidentReport;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="VolunteerNotification")
public class VolunteerNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "volunteerId", nullable = false)
    private Volunteer volunteer;

    @Transient // Mark as transient since IncidentReport is not persisted
    private IncidentReport incidentReport;

    private LocalDateTime createdAt = LocalDateTime.now();




}
