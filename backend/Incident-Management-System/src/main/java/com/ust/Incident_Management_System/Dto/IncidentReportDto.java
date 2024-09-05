package com.ust.Incident_Management_System.Dto;

import com.ust.Incident_Management_System.Model.IncidentStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidentReportDto {

    private String contactName;
    private String location;
    private String contactPhone;
    private String description;
    private String typeOfIncident;
    private String typeOfPerson;

    private String latitude;
    private String longitude;


    private IncidentStatus status; // Default status is ACTIVE
    private String state;
    private String city;
   // private String photoPath;
    private LocalDateTime reportedAt=LocalDateTime.now();

    private String mapLink = String.format("https://maps.google.com/?q=%s,%s", latitude, longitude);
}
