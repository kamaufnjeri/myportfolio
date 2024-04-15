import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { handleGetRequests } from "../Methods/handleApiRequests";
import { toast } from "react-toastify";
import styles from "./AdminAddProjectPage.module.css";
import SiderBar from "../Components/SiderBar";
import UpdateProject from "../Components/UpdateProject";

export default function AdminUpdateProjectPage() {
  const navigate = useNavigate();
  // make this route protected using useEffect
  
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
  }, []);


  return (
    <div>
      <div className={styles.dashboard}>
        <SiderBar />
        <UpdateProject />
      </div>
    </div>
  );
}
