package tushar.resumebuilderapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tushar.resumebuilderapi.model.User;
import tushar.resumebuilderapi.repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            User u = existingUser.get();
            u.setImageUrl(user.getImageUrl());
            u.setName(user.getName());
            return ResponseEntity.ok(userRepository.save(u));
        } else {
            return ResponseEntity.ok(userRepository.save(user));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
