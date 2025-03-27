import React from "react";
import "/src/assets/style.css";
import Navigation from "../components/Navigation";
import Posts from "../components/BlogPosts";
import BlogIcon from "/src/assets/Healthlink-blog-icon.svg";

const Blog = () => {
  return (
    <div className="app-container">
      <Navigation />

      <div className="blog-header">
        <div className="blog-header-text">
          <h1> Welcome to HealthLink Connect</h1>
          <p> Stay connected with the latest health news and updates</p>
        </div>
        <div className="blog-header-img">
          <img src={BlogIcon} alt="health blog icon" />
        </div>
      </div>

      <div className="blog-posts">
        <Posts />
      </div>
    </div>
  );
};

export default Blog;
