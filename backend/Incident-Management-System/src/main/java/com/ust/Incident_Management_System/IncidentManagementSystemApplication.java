package com.ust.Incident_Management_System;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
//import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
public class IncidentManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(IncidentManagementSystemApplication.class, args);
	}

}
