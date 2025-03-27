import React from "react";
import "/src/assets/style.css";

const Posts = () => {
  return (
    <div className="posts-container">
      <h3>Recent Posts</h3>

      <div className="posts">
        <div className="post-card">
          <span className="post-date">27 Feb 2025</span>
          <div className="post-title-image">
            <span className="post-title">Anemia Awareness</span>
            <img />
          </div>
        </div>
      </div>
      <div className="post-card">
        <span className="post-date">27 Feb 2025</span>
        <div className="post-title-image">
          <span className="post-title">Anemia Awareness</span>
          <img />
        </div>
      </div>

      <button className="view-more-btn" type="button">
        {" "}
        View More{" "}
      </button>
    </div>
  );
};

export default Posts;
