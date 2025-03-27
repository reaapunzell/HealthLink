import React from "react";
import "/src/assets/style.css";
import Navigation from "../components/Navigation";
import Posts from "../components/BlogPosts";

const Blog = () => {
  return (
    <div className="app-container">
      <Navigation />

      <div className="blog-header">
        <h1> Welcome to HealthLink Connect</h1>
        <p> Stay connected with the latest health news and updates</p>
        <img />
      </div>

      <div className="blog-posts">
        <Posts />
      </div>
    </div>
  );
};

export default Blog;
