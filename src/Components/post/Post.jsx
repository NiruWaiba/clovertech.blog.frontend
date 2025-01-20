import { Link } from "react-router-dom";
import "./post.css";

const Post = ({ post }) => {
  const PF = "https://blog.hamrosystem.com/PostImages/";
  
  // More robust image URL validation and construction
  const getImageUrl = () => {
    // Check if post.photo exists and is not empty
    if (!post?.photo) {
      return null;
    }
    
    try {
      // Clean the photo path
      const cleanPhotoPath = post.photo
        .replace(/^\/+/, '')  // Remove leading slashes
        .replace(/\\/g, '/'); // Replace backslashes with forward slashes
      
      // Remove wwwroot/PostImages/ if present
      const photoPath = cleanPhotoPath.includes("wwwroot/PostImages/")
        ? cleanPhotoPath.replace("wwwroot/PostImages/", "")
        : cleanPhotoPath;
      
      // Ensure clean URL construction
      const finalUrl = `${PF}${photoPath}`.replace(/([^:]\/)\/+/g, "$1");
      
      // Validate URL
      new URL(finalUrl);
      return finalUrl;
    } catch (error) {
      console.error("Invalid image URL:", error);
      return null;
    }
  };

  const formatDate = () => {
    try {
      // Try to parse the post.createdAt date
      const date = new Date(post.createdAt);
      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        return date.toDateString();
      }
      // If date is invalid, return current date
      return new Date().toDateString();
    } catch {
      // If there's any error, return current date
      return new Date().toDateString();
    }
  };

  return (
    <div className="post">
      <img
        className="postImg"
        src={getImageUrl() || "/default-placeholder.jpg"} // Use a local placeholder as primary fallback
        alt={post.title || "Post image"}
        onError={(e) => {
          console.error("Image failed to load, using placeholder");
          e.target.src = "https://via.placeholder.com/150";
          e.target.alt = "Placeholder image";
        }}
      />
      <div className="postInfo">
        {/* <div className="postCats">
          {post.category && (
            <span className="postCat">{post.category}</span>
          )}
        </div> */}

        <Link to={`/post/${post.postId}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{formatDate()}</span>
      </div>

      <p className="postDesc">{post.description}</p>
    </div>
  );
};

export default Post;