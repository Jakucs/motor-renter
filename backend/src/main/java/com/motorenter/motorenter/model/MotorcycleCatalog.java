package com.motorenter.motorenter.model;

import jakarta.persistence.*;

@Entity
@Table(name="motorcycle_catalog")
public class MotorcycleCatalog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String make;
    private String model;
    private String type;
    private String displacement;
    private String power;

    public MotorcycleCatalog() {}

    public MotorcycleCatalog(String make, String model, String type, String displacement, String power) {
        this.make = make;
        this.model = model;
        this.type = type;
        this.displacement = displacement;
        this.power = power;
    }

    public int getId() { return id; }
    public String getMake() { return make; }
    public String getModel() { return model; }
    public String getType() { return type; }
    public String getDisplacement() { return displacement; }
    public String getPower() { return power; }

    public void setMake(String make) { this.make = make; }
    public void setModel(String model) { this.model = model; }
    public void setType(String type) { this.type = type; }
    public void setDisplacement(String displacement) { this.displacement = displacement; }
    public void setPower(String power) { this.power = power; }
}
