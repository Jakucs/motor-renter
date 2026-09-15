package seeder;

import com.motorenter.motorenter.repository.MotorcycleCatalogRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MotorcycleDataSeeder implements CommandLineRunner {

    private final MotorcycleCatalogRepository repository;

    public MotorcycleDataSeeder(MotorcycleCatalogRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) return; // ha már fel van töltve

        // API Ninjas-t
    }
}
