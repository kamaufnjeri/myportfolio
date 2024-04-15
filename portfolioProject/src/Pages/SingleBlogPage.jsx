import React from 'react'
import SingleBlog from '../Components/SingleBlog';

const SingleBlogPage = () => {
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
      <SingleBlog />
    </div>
  );
}

export default SingleBlogPage
