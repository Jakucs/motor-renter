package com.motorenter.motorenter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MotorenterApplication {

    public static void main(String[] args) {
        SpringApplication.run(MotorenterApplication.class, args);
    }

}
