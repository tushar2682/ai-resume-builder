package tushar.resumebuilderapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tushar.resumebuilderapi.model.User;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
