import React, { useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./AdminAddProjectPage.module.css";
import SiderBar from "../Components/SiderBar";
import { useNavigate } from "react-router-dom";
import AdminProjects from "../Components/AdminProjects";
import { handleGetRequests } from "../Methods/handleApiRequests";
// Import handleGetRequests from your API file

const AdminProjectsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token Found')
      }
    } catch (error) {
      toast.error("Error fetching data! Please login");
      // Handle errors here, like displaying an error message or redirecting to home
      navigate("/adminlogin");
    }
  }, []); // Added navigate as a dependency to useEffect

  return (
    <div className={styles.dashboard}>
      <SiderBar />
      <AdminProjects />
    </div>
  );
};

export default AdminProjectsPage;
