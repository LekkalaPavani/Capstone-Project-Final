package com.ust.Incident_Management_System.Dto;

import com.ust.Incident_Management_System.Model.IncidentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidentResponse {

    private String contactName;
    private String location;
    private String contactPhone;
    private String description;

    private String latitude;
    private String longitude;

    private String typeOfIncident;
    private IncidentStatus status;
    private String city;
    private String photoPath;
    private LocalDateTime reportedAt=LocalDateTime.now();
    private String mapLink= String.format("https://maps.google.com/?q=%s,%s", latitude, longitude);
}
