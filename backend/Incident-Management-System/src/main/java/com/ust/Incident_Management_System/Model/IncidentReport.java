package com.ust.Incident_Management_System.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Incident")
public class IncidentReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long incidentId;
    private String contactName;
    private String location;
    private String contactPhone;
    private String description;
    private String typeOfIncident;
    private String typeOfPerson;

    private String latitude;
    private String longitude;

    @Enumerated(EnumType.STRING)
    private IncidentStatus status = IncidentStatus.ACTIVE; // Default status is ACTIVE
    private String state;
    private String city;
    //private String photoPath;
    private LocalDateTime reportedAt=LocalDateTime.now();

    private String mapLink = String.format("https://maps.google.com/?q=%s,%s", latitude, longitude);


}
