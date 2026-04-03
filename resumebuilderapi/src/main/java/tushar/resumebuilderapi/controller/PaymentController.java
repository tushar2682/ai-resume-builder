package tushar.resumebuilderapi.controller;

import com.razorpay.RazorpayException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tushar.resumebuilderapi.model.Payment;
import tushar.resumebuilderapi.model.User;
import tushar.resumebuilderapi.repository.UserRepository;
import tushar.resumebuilderapi.service.PaymentService;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserRepository userRepository;

    public PaymentController(PaymentService paymentService, UserRepository userRepository) {
        this.paymentService = paymentService;
        this.userRepository = userRepository;
    }

    @PostMapping("/create-order")
    public ResponseEntity<Payment> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        String userId = (String) data.get("userId");
        Long amount = Long.valueOf(data.get("amount").toString());
        return ResponseEntity.ok(paymentService.createOrder(userId, amount));
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> data) {
        String orderId = data.get("razorpay_order_id");
        String paymentId = data.get("razorpay_payment_id");
        String signature = data.get("razorpay_signature");
        String userId = data.get("userId");

        boolean isValid = paymentService.verifyPayment(orderId, paymentId, signature);
        if (isValid) {
            paymentService.updatePaymentStatus(orderId, paymentId, signature, "PAID");
            
            // Upgrade user to premium
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setPremium(true);
                user.setPremiumExpires(LocalDateTime.now().plusYears(1));
                userRepository.save(user);
            }
            return ResponseEntity.ok("Payment successful and verified");
        } else {
            paymentService.updatePaymentStatus(orderId, paymentId, signature, "FAILED");
            return ResponseEntity.badRequest().body("Invalid signature");
        }
    }
}
