package Backend.controller;

import Backend.model.User;
import Backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private static final String UPLOAD_DIR = "D:/Edu_Ceylon/Backend/uploads/";

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already exists!";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null) {
            return "User not found!";
        }
        if (existingUser.isGoogleUser()) {
            return "Please use Google Sign-In!";
        }
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid password!";
        }
        return "Login successful!";
    }

    @PostMapping("/google-login")
    public String googleLogin(@RequestBody Map<String, String> googleUser) {
        String email = googleUser.get("email");
        String name = googleUser.get("name");
        String picture = googleUser.get("picture");

        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            if (!existingUser.isGoogleUser()) {
                return "Please use regular login!";
            }
            // Update profile picture if changed
            if (picture != null && !picture.equals(existingUser.getProfileImage())) {
                existingUser.setProfileImage(picture);
                userRepository.save(existingUser);
            }
            return "Login successful!";
        }

        // Create new user if not exists
        User newUser = new User(email, name, email);
        newUser.setProfileImage(picture);
        userRepository.save(newUser);
        return "Login successful!";
    }

    @PostMapping("/google-signup")
    public String googleSignup(@RequestBody Map<String, String> googleUser) {
        String email = googleUser.get("email");
        String name = googleUser.get("name");
        String picture = googleUser.get("picture");

        if (userRepository.existsByEmail(email)) {
            User existingUser = userRepository.findByEmail(email);
            if (!existingUser.isGoogleUser()) {
                return "Email already exists with regular login!";
            }
            return "User already exists. Please login!";
        }

        User newUser = new User(email, name, email);
        newUser.setProfileImage(picture);
        userRepository.save(newUser);
        return "Registration successful!";
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

    @PutMapping("/upload/{email}")
    public User uploadProfileImage(@PathVariable String email, @RequestParam("image") MultipartFile image) throws IOException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found!");
        }

        // Save image to uploads folder
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        File dest = new File(UPLOAD_DIR + fileName);
        image.transferTo(dest);

        // Save ONLY the filename
        user.setProfileImage(fileName);

        return userRepository.save(user);
    }

    @PutMapping("/uploadCover/{email}")
    public User uploadCoverImage(@PathVariable String email, @RequestParam("image") MultipartFile image) throws IOException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found!");
        }

        // Save image to uploads folder
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        File dest = new File(UPLOAD_DIR + fileName);
        image.transferTo(dest);

        // Save ONLY the filename
        user.setCoverImage(fileName);

        return userRepository.save(user);
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        File file = new File(UPLOAD_DIR + filename);
        Resource resource = new UrlResource(file.toURI());
        if (!resource.exists()) {
            throw new RuntimeException("Image not found: " + filename);
        }
        return ResponseEntity.ok().body(resource);
    }
}
