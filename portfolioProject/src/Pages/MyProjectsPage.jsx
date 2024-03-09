import React, { useEffect, useState } from 'react';
import MyProjectsList from '../Components/MyProjectsList';
import { handleGetRequests } from '../Methods/handleApiRequests';

const MyProjectsPage = () => {
  // Using state for getting projects
  const [data, setData] = useState([]);

  // styles variables
  const mainContentStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90vw",
    flexDirection: "column",
    margin: "15vh 20px 20px",
    borderRadius: "5px",
    padding: "10px",
    textAlign: "justify",
  }

  // useEffect hook to retrieve projects from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await handleGetRequests("projects/allprojects");
        if (resp.status === 200) {
          setData(resp.data.projects);
        } else if (resp.status === 404 || resp.status === 500) {
          console.log(resp.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div style={mainContentStyle}>
      <h2>🌟 Welcome to My Projects Portfolio! 🌟</h2>
      <p>
        Here are some of the projects I have been involved in over the past year at ALX for my portfolio page.
      </p>
      <MyProjectsList projects={data} />
    </div>
  );
};

export default MyProjectsPage;
