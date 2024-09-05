package com.ust.Volunteer_Service.Controller;

import com.ust.Incident_Management_System.Model.IncidentReport;
import com.ust.Volunteer_Service.Dto.VolunteerDto;
import com.ust.Volunteer_Service.Dto.VolunteerResponse;
import com.ust.Volunteer_Service.Model.Volunteer;
import com.ust.Volunteer_Service.Service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {
    @Autowired
    private VolunteerService volunteerService;

    @PostMapping("/createVolunteer")
    public ResponseEntity<VolunteerResponse>addVolunteer(@RequestBody VolunteerDto volunteerDto){
        return ResponseEntity.ok(volunteerService.saveVolunteer(volunteerDto));
    }
    @GetMapping("/{volunteerId}")
    public ResponseEntity<VolunteerResponse> getVolunteerById(@PathVariable Long volunteerId) {
        VolunteerResponse volunteer = volunteerService.getVolunteerById(volunteerId);
        return ResponseEntity.ok(volunteer);
    }

    @GetMapping
    public ResponseEntity<List<VolunteerResponse>> getAllVolunteers() {
        return ResponseEntity.ok(volunteerService.getAllVolunteers());
    }

//    @GetMapping("/findby-email/{email}")
//    public ResponseEntity<VolunteerResponse> getResidentByEmail(@PathVariable("email") String email) {
//        VolunteerResponse volunteer = volunteerService.getVolunteerByEmail(email);
//        return ResponseEntity.ok(volunteer);
//    }

//    @GetMapping("/getincidentreports")
//    public ResponseEntity<List<IncidentReport>> getIncidentReports() {
//
//        return ResponseEntity.ok(volunteerService.getIncidentReports());
//
//    }

//    @GetMapping("/reports")
//    public List<IncidentReport> getAllIncidentReports() {
//        return volunteerService.getAllIncidentReports();
//    }

    @PutMapping("update/{volunteerId}")
    public ResponseEntity<VolunteerResponse> updateVolunteer(@PathVariable Long id, @RequestBody VolunteerDto volunteerDto) {
        VolunteerResponse updatedVolunteer = volunteerService.updateVolunteer(id, volunteerDto);
        if (updatedVolunteer != null) {
            return ResponseEntity.ok(updatedVolunteer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("delete/{volunteerId}")
    public ResponseEntity<Void> deleteVolunteer(@PathVariable Long id) {
        boolean isRemoved = volunteerService.deleteVolunteer(id);
        if (isRemoved) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Volunteer>> getVolunteersByCity(@PathVariable String city) {
        List<Volunteer> volunteers = volunteerService.getVolunteersByCity(city);
        return ResponseEntity.ok(volunteers);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Volunteer> getVolunteerByEmail(@PathVariable String email) {
        Volunteer volunteer = volunteerService.getVolunteerByEmail(email);
        if (volunteer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(volunteer);
    }





}
