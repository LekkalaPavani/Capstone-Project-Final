package com.ust.Volunteer_Service.Service;

import com.ust.Incident_Management_System.Model.IncidentReport;
import com.ust.Volunteer_Service.Dto.VolunteerDto;
import com.ust.Volunteer_Service.Dto.VolunteerResponse;
import com.ust.Volunteer_Service.Model.Volunteer;
import com.ust.Volunteer_Service.Model.VolunteerAvailability;
import com.ust.Volunteer_Service.Repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class VolunteerService {
    private final List<IncidentReport> incidentReports = new ArrayList<>();
    public synchronized void addIncidentReport(IncidentReport report) {
        incidentReports.add(report);
    }
    public synchronized List<IncidentReport> getAllIncidentReports() {
        return new ArrayList<>(incidentReports);
    }

    public synchronized List<IncidentReport> getIncidentReportsByCity(String cityName) {
        return incidentReports.stream()
                .filter(report -> cityName.equals(report.getCity()))
                .collect(Collectors.toList());
    }

    @Autowired
    private VolunteerRepository volunteersRepo;
    public VolunteerResponse saveVolunteer(VolunteerDto volunteerDto) {
        Volunteer volunteer = DtoToEntity(volunteerDto);
        Volunteer savedVolunteer= volunteersRepo.save(volunteer);
        return EntityToDto(savedVolunteer);
    }


  public List<VolunteerResponse> getAllVolunteers(){
      List<Volunteer> volunteers = volunteersRepo.findAll();
      return volunteers.stream().map(this::EntityToDto).collect(Collectors.toList());
   }




    public VolunteerResponse updateVolunteer(Long id, VolunteerDto volunteerDto) {
        return volunteersRepo.findById(id).map(volunteer -> {
            volunteer.setContactName(volunteerDto.getContactName());
            volunteer.setAddress(volunteerDto.getAddress());
            volunteer.setState(volunteerDto.getState());
            volunteer.setVolunteerCity(volunteerDto.getVolunteerCity());
            volunteer.setAge(volunteerDto.getAge());
            volunteer.setGender(volunteerDto.getGender());
            volunteer.setPhoneNumber(volunteerDto.getPhoneNumber());
            volunteer.setEmail(volunteerDto.getEmail());
            volunteer.setSkills(volunteerDto.getSkills());

            volunteer.setAvailabilityStatus(volunteerDto.getAvailabilityStatus());
            Volunteer updatedVolunteer = volunteersRepo.save(volunteer);
            return EntityToDto(updatedVolunteer);
        }).orElse(null);
    }

    public boolean deleteVolunteer(Long id) {
        if (volunteersRepo.existsById(id)) {
            volunteersRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public List<Volunteer> getVolunteersByCity(String city) {
        return volunteersRepo.findByVolunteerCity(city);
    }
//
    public Volunteer getVolunteerByEmail(String email) {
        return volunteersRepo.findByEmail(email);
    }
//    public VolunteerResponse getVolunteerByEmail(String email) {
//        Volunteer volunteer = volunteersRepo.findByEmail(email);
//        return EntityToDto(volunteer);
//    }







    private Volunteer DtoToEntity(VolunteerDto volunteerDto){
        Volunteer volunteer = new Volunteer();
        volunteer.setContactName(volunteerDto.getContactName());
        volunteer.setAddress(volunteerDto.getAddress());
        volunteer.setState(volunteerDto.getState());
        volunteer.setVolunteerCity(volunteerDto.getVolunteerCity());
        volunteer.setAge(volunteerDto.getAge());
        volunteer.setGender(volunteerDto.getGender());
        volunteer.setPhoneNumber(volunteerDto.getPhoneNumber());
        volunteer.setEmail(volunteerDto.getEmail());

        volunteer.setSkills(volunteerDto.getSkills());
//        volunteer.setPhotoPath(volunteerDto.getPhotoPath());


        return volunteer;
    }


    private VolunteerResponse EntityToDto(Volunteer volunteer){
       VolunteerResponse volunteerResponse = new VolunteerResponse();
        volunteerResponse.setContactName(volunteer.getContactName());
        volunteerResponse.setAddress(volunteer.getAddress());
        volunteerResponse.setAge(volunteer.getAge());
        volunteerResponse.setGender(volunteer.getGender());
        volunteerResponse.setVolunteerCity(volunteer.getVolunteerCity());
        volunteerResponse.setPhoneNumber(volunteer.getPhoneNumber());
        volunteerResponse.setEmail(volunteer.getEmail());
        volunteerResponse.setSkills(volunteer.getSkills());
//        volunteerResponse.setPhotoPath(volunteer.getPhotoPath());
        volunteerResponse.setAvailabilityStatus(volunteer.getAvailabilityStatus());

        return volunteerResponse;
    }


    public VolunteerResponse getVolunteerById(Long volunteerId) {
        Volunteer volunteer = volunteersRepo.findById(volunteerId).orElse(null);
        return EntityToDto(volunteer);
    }
}
