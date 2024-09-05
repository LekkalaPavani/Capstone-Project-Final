package com.ust.Incident_Management_System.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidentReport {

    private Long incidentId;
    private String typeOfPerson;
    private String contact_name;
    private String description;
    private String typeOfIncident;
    private String latitude;
    private String longitude;
    private String severity;
    private String status;
    private String state;
    private String city;
    private String photoPath;
    private LocalDateTime reportedAt;


}

