import React, { useEffect, useState } from "react";
import styles from "./AdminProjects.module.css";
import { handleDeleteRequests, handleGetRequests } from "../Methods/handleApiRequests";
import {toast} from "react-toastify";
import { Link } from "react-router-dom";

const AdminTools = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const resp = await handleGetRequests("projects/alltools");
        
        if (resp.status === 200) {
            setTools(resp.data.tools);
        }
        else {
            console.log(resp.data.error);
            toast.error(resp.data.message);
        }
    }
     fetchData();
  }, [tools])

  return (
    <div className={styles.maincontent}>
      {/* Heading */}
      <h2>My projects</h2>

      {/* Table structure */}
      <div className={styles.table}>
        {/* Table header */}
        <div className={styles.tablerow}>
          <h3>Number</h3>
          <h3>Name/Title</h3>
          <h3>Actions</h3>
        </div>

        {/* Mapping through projects to display each project */}
        {tools.map((tool, index) => (
          <div className={styles.tablerow} key={tool._id}>
            {/* Displaying project details */}
            <p>{index + 1}</p>
            <p>{tool.name}</p>
            {/* Placeholder for edit/update buttons */}
            <div className={styles.actionbtns}>
                <Link to={`/admindashboard/tools/${tool._id}`}><button>Edit</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTools;
