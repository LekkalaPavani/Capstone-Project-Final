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
    private String location;
    private String contactPhone;
    private String contactName;
    private String description;
    private String typeOfIncident;
    private String latitude;
    private String longitude;
    private String status;
    private String state;
    private String city;
    private String photoPath;
    private LocalDateTime reportedAt;

    public String getMapLink() {
        return String.format("https://maps.google.com/?q=%s,%s", latitude, longitude);
    }


}

