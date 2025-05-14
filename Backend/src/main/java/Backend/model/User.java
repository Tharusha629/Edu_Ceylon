package Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private String profileImage;
    private String coverImage;
    private String name;
    private String googleId;
    private boolean isGoogleUser;

    // Constructors
    public User() {}

    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.isGoogleUser = false;
    }

    public User(String email, String name, String googleId) {
        this.email = email;
        this.name = name;
        this.googleId = googleId;
        this.isGoogleUser = true;
    }

    // Getters and Setters
    public String getId() { return id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }

    public String getCoverImage() {
        return coverImage;
    }
    
    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGoogleId() { return googleId; }
    public void setGoogleId(String googleId) { this.googleId = googleId; }

    public boolean isGoogleUser() { return isGoogleUser; }
    public void setGoogleUser(boolean googleUser) { isGoogleUser = googleUser; }
}
