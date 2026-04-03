package tushar.resumebuilderapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "resumes")
@AllArgsConstructor
@NoArgsConstructor
public class Resume {

    @Id
    private String id;
    private String userId;
    private String templateId;
    private String title;
    
    private ContactInfo contact;
    private List<Experience> experiences;
    private List<Education> education;
    private List<String> skills;
    private String summary;
    
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Data
    public static class ContactInfo {
        private String fullName;
        private String email;
        private String phone;
        private String location;
        private String linkedin;
        private String github;
        private String website;
    }

    @Data
    public static class Experience {
        private String company;
        private String position;
        private String location;
        private String startDate;
        private String endDate;
        private String description;
        private boolean current;
    }

    @Data
    public static class Education {
        private String school;
        private String degree;
        private String fieldOfStudy;
        private String startDate;
        private String endDate;
        private String gpa;
    }
}
