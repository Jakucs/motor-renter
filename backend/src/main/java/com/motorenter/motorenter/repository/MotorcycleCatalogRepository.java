package com.motorenter.motorenter.repository;

import com.motorenter.motorenter.model.MotorcycleCatalog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MotorcycleCatalogRepository extends JpaRepository<MotorcycleCatalog, Integer> {
    List<MotorcycleCatalog> findByMake(String make);
    List<String> findDistinctMakeBy();
}
