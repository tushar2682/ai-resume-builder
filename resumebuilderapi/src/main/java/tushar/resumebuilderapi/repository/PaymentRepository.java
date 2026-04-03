package tushar.resumebuilderapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tushar.resumebuilderapi.model.Payment;
import java.util.Optional;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    Optional<Payment> findByRazorpayOrderId(String orderId);
}
