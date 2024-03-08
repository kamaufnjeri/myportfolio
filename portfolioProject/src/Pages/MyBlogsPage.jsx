import React, { useEffect, useState } from 'react'
import MyProjectsList from '../Components/MyProjectsList';
import { handleGetRequests } from '../Methods/handleApiRequests';
import MyBlogs from '../Components/MyBlogs';

export default function MyBlogsPage() {
  // Using state for getting projects
  const [data, setData] = useState([]);

  // styles variables
  const mainContentStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90vw",
    flexDirection: "column",
    border: "2px solid #ccc",
    margin: "15vh 20px 20px",
    borderRadius: "5px",
    padding: "10px",
    textAlign: "justify",
  }

  
  return (
    <div style={mainContentStyle}>
      <h2>🌟 Welcome to My Blog Page! 🌟</h2>
      <p>
      📝 Dive into My World: Explore a Collection of My Blogs.
        Join me on a journey of words, where each blog is a window into my thoughts and experiences.
      </p>
      <MyBlogs />
    </div>
  );
}
