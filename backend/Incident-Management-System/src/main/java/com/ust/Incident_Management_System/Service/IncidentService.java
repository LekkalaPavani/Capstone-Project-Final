package com.ust.Incident_Management_System.Service;

import com.ust.Incident_Management_System.Dto.IncidentReportDto;
import com.ust.Incident_Management_System.Dto.IncidentResponse;
import com.ust.Incident_Management_System.Model.IncidentReport;
import com.ust.Incident_Management_System.Model.IncidentStatus;
import com.ust.Incident_Management_System.Repository.IncidentRepository;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IncidentService {
    @Autowired
    private IncidentRepository incidentRepo;
    @Autowired
    private KafkaTemplate<String, IncidentReport> kafkaTemplate;
    private static final String TOPIC = "incident-topic";

    public IncidentResponse addIncident(IncidentReportDto incidentReportDto) {
        IncidentReport incident = DtoToEntity(incidentReportDto);
        incident.setStatus(IncidentStatus.ACTIVE);
        IncidentReport savedReport = incidentRepo.save(incident);
        kafkaTemplate.send(TOPIC, savedReport);
        return EntityToDto(savedReport);
    }

    public IncidentResponse getIncidentById(Long incidentId) {
        IncidentReport incidentReport = incidentRepo.findById(incidentId).orElse(null);
        if (incidentReport == null) {
            throw new RuntimeException("Incident not found with id: " + incidentId);
        }
        return EntityToDto(incidentReport);
    }

    public List<IncidentResponse> getAllIncidents() {
        List<IncidentReport> incidentReport = incidentRepo.findAll();
        return incidentReport.stream().map(this::EntityToDto).collect(Collectors.toList());

    }

    public List<IncidentResponse> getIncidentsByCity(String city) {
        List<IncidentReport> incidents = incidentRepo.findByCity(city);
        return incidents.stream().map(this::EntityToDto).collect(Collectors.toList());
    }


  private IncidentReport DtoToEntity(IncidentReportDto incidentReportDto){
        IncidentReport incidentReport = new IncidentReport();
        incidentReport.setContactName(incidentReportDto.getContactName());
        incidentReport.setLocation(incidentReportDto.getLocation());
        incidentReport.setContactPhone(incidentReportDto.getContactPhone());
        incidentReport.setDescription(incidentReportDto.getDescription());
        incidentReport.setTypeOfIncident(incidentReportDto.getTypeOfIncident());
        incidentReport.setTypeOfPerson(incidentReportDto.getTypeOfPerson());

        incidentReport.setLatitude(incidentReportDto.getLatitude());
        incidentReport.setLongitude(incidentReportDto.getLongitude());
        incidentReport.setStatus(incidentReportDto.getStatus());
        incidentReport.setState(incidentReportDto.getState());
        incidentReport.setCity(incidentReportDto.getCity());


        return incidentReport;

  }

    private IncidentResponse EntityToDto(IncidentReport incidentReport) {
        IncidentResponse incidentResponse = new IncidentResponse();
        incidentResponse.setContactName(incidentReport.getContactName());
        incidentResponse.setLocation(incidentReport.getLocation());
        incidentResponse.setContactPhone(incidentReport.getContactPhone());
        incidentResponse.setDescription(incidentReport.getDescription());
        incidentResponse.setLatitude(incidentReport.getLatitude());
        incidentResponse.setLongitude(incidentReport.getLongitude());
        incidentResponse.setTypeOfIncident(incidentReport.getTypeOfIncident());
        incidentResponse.setStatus(incidentReport.getStatus());
        incidentResponse.setCity(incidentReport.getCity());
        return incidentResponse;
    }



//    public List<IncidentReport> getIncidentsByType(String typeOfPerson) {
//        return incidentRepo.findByTypeOfPerson(typeOfPerson);
//    }
//
//    public List<IncidentReport> getIncidentsBySeverity(String severity) {
//        return incidentRepo.findBySeverity(severity);
//    }
//
//    public List<IncidentReport> getIncidentsByStatus(String status) {
//        return incidentRepo.findByStatus(status);
//    }
//
//    public List<IncidentReport> getIncidentsByTypeOfIncident(String typeOfIncident) {
//        return incidentRepo.findByTypeOfIncident(typeOfIncident);
//    }
//
//    public List<IncidentReport> getIncidentsByLatitudeAndLongitude(String lat, String lng) {
//        return incidentRepo.findByLatitudeAndLongitude(lat, lng);
//    }
//
//    public List<IncidentReport> getIncidentsByTypeofIncidentAndSeverity(String typeOfIncident, String severity) {
//        return incidentRepo.findByTypeOfIncidentAndSeverity(typeOfIncident, severity);
//    }


//    @Transactional
//    public void reportIncident(IncidentReport incidentReportDetails) {
//        // Create and save incident report to the database
//
//        incidentRepo.save(incidentReportDetails);
//
//        // Send incident report to the Kafka topic
//        kafkaTemplate.send(TOPIC, incidentReportDetails);
//    }
}
