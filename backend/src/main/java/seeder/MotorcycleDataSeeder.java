package seeder;

import com.motorenter.motorenter.model.MotorcycleCatalog;
import com.motorenter.motorenter.repository.MotorcycleCatalogRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.http.HttpHeaders;
import java.util.List;
import java.util.Map;

@Component
public class MotorcycleDataSeeder implements CommandLineRunner {

    private final MotorcycleCatalogRepository repository;

    public MotorcycleDataSeeder(MotorcycleCatalogRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) return; //ha már felvavn töltve

        List<String> makes = List.of("Honda", "Yamaha", "Kawasaki", "Suzuki", "BMW",
                "Ducati", "KTM", "Triumph", "Harley-Davidson",
                "Aprilia", "MV Agusta", "Royal Enfield");

        RestTemplate restTemplate = new RestTemplate();
        String apiKey = "API KULCS";

        for (String make : makes) {
            String url = "https://api.api-ninjas.com/v1/motorcycles?make=" + make + "&limit=50";

            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Api-Key", apiKey);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<List<Map<String, String>>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<List<Map<String, String>>>() {}
            );

            List<Map<String, String>> motorcycles = response.getBody();
            if (motorcycles == null) continue;

            for (Map<String, String> m : motorcycles) {
                MotorcycleCatalog catalog = new MotorcycleCatalog(
                        m.get("make"),
                        m.get("model"),
                        m.get("type"),
                        m.get("displacement"),
                        m.get("power")
                );
                repository.save(catalog);
            }
        }
    }
}
