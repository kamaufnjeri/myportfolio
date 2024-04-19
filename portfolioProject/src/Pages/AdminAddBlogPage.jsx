import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AdminAddProjectPage.module.css";
import SiderBar from "../Components/SiderBar";
import AddBlog from "../Components/AddBlog";
import FindMe from "../Components/FindMe";

export default function AdminAddProjectPage() {
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
        <div className={styles.contactMe}>
          <FindMe/>
        </div>
        <SiderBar />
        <AddBlog />
      </div>
    </div>
  );
}
