package tushar.resumebuilderapi.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import tushar.resumebuilderapi.model.Payment;
import tushar.resumebuilderapi.repository.PaymentRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PaymentService {

    @Value("${razorpay.key-id}")
    private String keyId;

    @Value("${razorpay.key-secret}")
    private String keySecret;

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payment createOrder(String userId, Long amount) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // amt in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

        Order order = client.orders.create(orderRequest);

        Payment payment = Payment.builder()
                .userId(userId)
                .razorpayOrderId(order.get("id"))
                .amount(amount)
                .status("CREATED")
                .createdAt(LocalDateTime.now())
                .build();

        return paymentRepository.save(payment);
    }

    public boolean verifyPayment(String orderId, String paymentId, String signature) {
        try {
            String combinedData = orderId + "|" + paymentId;
            return Utils.verifyPaymentSignature(combinedData, signature, keySecret);
        } catch (Exception e) {
            return false;
        }
    }

    public void updatePaymentStatus(String orderId, String paymentId, String signature, String status) {
        Optional<Payment> paymentOpt = paymentRepository.findByRazorpayOrderId(orderId);
        if (paymentOpt.isPresent()) {
            Payment payment = paymentOpt.get();
            payment.setRazorpayPaymentId(paymentId);
            payment.setRazorpaySignature(signature);
            payment.setStatus(status);
            payment.setUpdatedAt(LocalDateTime.now());
            paymentRepository.save(payment);
        }
    }
}
