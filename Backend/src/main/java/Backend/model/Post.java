package Backend.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    @Id
    private String id;

    private String email;
    private String description;
    private List<String> imageUrls;
    private int likes;
    private List<String> likedBy;
    private List<String> comments;
    

    public List<String> getLikedBy() {
        return likedBy;
    }
    
    public void setLikedBy(List<String> likedBy) {
        this.likedBy = likedBy;
    }
    
    public int getLikes() {
        return likes;
    }
    
    public void setLikes(int likes) {
        this.likes = likes;
    }
    
    public List<String> getComments() {
        return comments;
    }
    
    public void setComments(List<String> comments) {
        this.comments = comments;
    }
    
    public List<String> getImageUrls() {
        return imageUrls;
    }
    
    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    
}
