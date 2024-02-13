import React, { useEffect, useState } from "react";
import styles from "./AdminProjects.module.css";
import { handleDeleteRequests, handleGetRequests } from "../Methods/handleApiRequests";
import {toast} from "react-toastify";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  // Sample data for projects
  useEffect(() => {
    const fetchData = async () => {
        const resp = await handleGetRequests("projects/allprojects");
        console.log(resp)
        if (resp.status == 200) {
            setProjects(resp.data.projects);
        }
        else {
            console.log(resp.data.error);
            toast.error(resp.data.message);
        }
    }
     fetchData();
  }, [projects])

  // deleting project
  const handleDelete = async (id) => {
    const resp = await handleDeleteRequests(`projects/allprojects/${id}`);

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
        {projects.map((project, index) => (
          <div className={styles.tablerow} key={project._id}>
            {/* Displaying project details */}
            <p>{index + 1}</p>
            <p>{project.title}</p>
            {/* Placeholder for edit/update buttons */}
            <div className={styles.actionbtns}>
                <button>Edit</button>
                <button onClick={(e) => handleDelete(project._id)}>Delete</button>             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
