package com.ust.Volunteer_Service.Config;


import com.ust.Incident_Management_System.Model.IncidentReport;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration("NotificationConfiguration")
public class KafkaConfig {

    @Bean("NotificationConsumerFactory")
    public ConsumerFactory<String, IncidentReport> consumerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ConsumerConfig.GROUP_ID_CONFIG, "notification-group");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        config.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        config.put(JsonDeserializer.TRUSTED_PACKAGES, "*");


        // ErrorHandlingDeserializer configuration
        Map<String, Object> errorHandlingDeserializerProps = new HashMap<>();
        errorHandlingDeserializerProps.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS, JsonDeserializer.class.getName());
        errorHandlingDeserializerProps.put(JsonDeserializer.TRUSTED_PACKAGES, "*");

        return new DefaultKafkaConsumerFactory<>(config,
                new ErrorHandlingDeserializer<>(new StringDeserializer()), // Key deserializer
                new ErrorHandlingDeserializer<>(new JsonDeserializer<>(IncidentReport.class))); // Value deserializer
    }

    @Bean("NotificationContainerFactory")
    public ConcurrentKafkaListenerContainerFactory<String, IncidentReport> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, IncidentReport> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.MANUAL_IMMEDIATE);
        return factory;
    }
}


