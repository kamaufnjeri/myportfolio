import React, { useEffect, useState } from "react";
import styles from "./AdminProjects.module.css";
import { handleDeleteRequests, handleGetRequests } from "../Methods/handleApiRequests";
import {toast} from "react-toastify";

const AdminTools = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const resp = await handleGetRequests("projects/alltools");
        
        if (resp.status == 200) {
            setTools(resp.data.tools);
        }
        else {
            console.log(resp.data.error);
            toast.error(resp.data.message);
        }
    }
     fetchData();
  }, [tools])


  // deleting a tool
  const handleDelete = async (id) => {
    const resp = await handleDeleteRequests(`projects/alltools/${id}`);

    if (resp.status == 404 || resp.status == 500) {
      toast.error(resp.data.message);
    } else if (resp.status == 200) {
      toast.success(resp.data.message);
    } else {
      toast.error("Error deleting! Try again!");
    }
  }
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
                <button>Edit</button>
                <button onClick={(e) => handleDelete(tool._id)}>Delete</button> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTools;
