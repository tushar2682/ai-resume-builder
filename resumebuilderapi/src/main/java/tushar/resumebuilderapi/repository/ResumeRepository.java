package tushar.resumebuilderapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tushar.resumebuilderapi.model.Resume;
import java.util.List;

public interface ResumeRepository extends MongoRepository<Resume, String> {
    List<Resume> findByUserId(String userId);
}
