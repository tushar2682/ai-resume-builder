package tushar.resumebuilderapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tushar.resumebuilderapi.model.Resume;
import tushar.resumebuilderapi.repository.ResumeRepository;
import tushar.resumebuilderapi.service.AIService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeRepository resumeRepository;
    private final AIService aiService;

    public ResumeController(ResumeRepository resumeRepository, AIService aiService) {
        this.resumeRepository = resumeRepository;
        this.aiService = aiService;
    }

    @GetMapping("/user/{userId}")
    public List<Resume> getResumesByUserId(@PathVariable String userId) {
        return resumeRepository.findByUserId(userId);
    }

    @PostMapping
    public Resume createResume(@RequestBody Resume resume) {
        resume.setCreatedAt(LocalDateTime.now());
        resume.setUpdatedAt(LocalDateTime.now());
        return resumeRepository.save(resume);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resume> updateResume(@PathVariable String id, @RequestBody Resume resumeDetails) {
        return resumeRepository.findById(id)
                .map(resume -> {
                    resume.setTitle(resumeDetails.getTitle());
                    resume.setContact(resumeDetails.getContact());
                    resume.setExperiences(resumeDetails.getExperiences());
                    resume.setEducation(resumeDetails.getEducation());
                    resume.setSkills(resumeDetails.getSkills());
                    resume.setSummary(resumeDetails.getSummary());
                    resume.setUpdatedAt(LocalDateTime.now());
                    return ResponseEntity.ok(resumeRepository.save(resume));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable String id) {
        resumeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/ai/generate")
    public String generateResumeContent(@RequestBody String prompt) {
        return aiService.generateResumeContent(prompt);
    }

    @PostMapping("/ai/optimize")
    public String optimizeBullet(@RequestParam String bullet, @RequestParam String role) {
        return aiService.optimizeBulletPoint(bullet, role);
    }
}
