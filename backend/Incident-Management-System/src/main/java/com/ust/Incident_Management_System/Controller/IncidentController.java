package com.ust.Incident_Management_System.Controller;

import com.ust.Incident_Management_System.Dto.IncidentReportDto;
import com.ust.Incident_Management_System.Dto.IncidentResponse;
import com.ust.Incident_Management_System.Model.IncidentReport;
import com.ust.Incident_Management_System.Service.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/incident")
public class IncidentController {

    @Autowired
    private IncidentService service;


    @PostMapping("/report")
    public ResponseEntity<IncidentResponse> addIncidentReport(@RequestBody IncidentReportDto incidentReportDto){
        return ResponseEntity.ok(service.addIncident(incidentReportDto));

    }

    @GetMapping("/reports")
    public ResponseEntity<List<IncidentResponse>> getAllIncidents(){
        return ResponseEntity.ok(service.getAllIncidents());

    }

    @GetMapping("/report/{incidentId}")
    public ResponseEntity<IncidentResponse> getIncidentById(@PathVariable Long incidentId){
        return ResponseEntity.ok(service.getIncidentById(incidentId));
    }

    @GetMapping("/reports/{city}")
    public ResponseEntity<List<IncidentResponse>> getIncidentsByCity(@PathVariable String city){
        return ResponseEntity.ok(service.getIncidentsByCity(city));
    }

//    @GetMapping("/filterByType")
//    public ResponseEntity<List<IncidentReport>> getIncidentsByType(@RequestParam String type) {
//        return ResponseEntity.ok(service.getIncidentsByType(type));
//    }
//
//    @GetMapping("/filterBySeverity")
//    public ResponseEntity<List<IncidentReport>> getIncidentsBySeverity(@RequestParam String severity) {
//        return ResponseEntity.ok(service.getIncidentsBySeverity(severity));
//    }
//
//    @GetMapping("/filterByStatus")
//    public ResponseEntity<List<IncidentReport>> getIncidentsByStatus(@RequestParam String status) {
//        return ResponseEntity.ok(service.getIncidentsByStatus(status));
//    }
//
//    @GetMapping("/filterByTypeOfIncident")
//    public ResponseEntity<List<IncidentReport>> getIncidentsByTypeOfIncident(@RequestParam String typeOfIncident) {
//        return ResponseEntity.ok(service.getIncidentsByTypeOfIncident(typeOfIncident));
//    }
//
//    @GetMapping("/filterByLatitudeAndLongitude")
//    public ResponseEntity<List<IncidentReport>> getIncidentsByLatitudeAndLongitude(@RequestParam String lat, @RequestParam String lng) {
//        return ResponseEntity.ok(service.getIncidentsByLatitudeAndLongitude(lat, lng));
//    }
//
//    @GetMapping("/filterByTypeofIncidentAndSeverity")
//    public ResponseEntity<List<IncidentReport>> getIncidentsByTypeAndSeverity(@RequestParam String typeOfIncident, @RequestParam String severity) {
//        return ResponseEntity.ok(service.getIncidentsByTypeofIncidentAndSeverity(typeOfIncident, severity));
//    }


//    @PostMapping("/report")
//    public ResponseEntity<String> reportIncident(@RequestBody IncidentReport incidentReport) {
//        service.reportIncident(incidentReport);
//        notificationClient.sendNotification("New incident reported: " + incidentReport);
//        return ResponseEntity.ok("Incident reported and notification sent.");
//    }
}
