package tushar.resumebuilderapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String id;
    private String name;
    private String email;
    private String imageUrl;
    
    // Auth related
    private boolean isPremium = false;
    private LocalDateTime premiumExpires;
    
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime lastLogin = LocalDateTime.now();
}
