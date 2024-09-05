package com.ust.Incident_Management_System.Repository;

import com.ust.Incident_Management_System.Model.IncidentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IncidentRepository extends JpaRepository<IncidentReport,Long> {
    List<IncidentReport> findByTypeOfPerson(String typeOfPerson);
    List<IncidentReport> findByStatus(String status);
    List<IncidentReport> findByTypeOfIncident(String typeOfIncident);
    List<IncidentReport> findByLatitudeAndLongitude(String lat, String lng);
    // Add more methods based on your filtering needs


    List<IncidentReport> findByCity(String city);
}
