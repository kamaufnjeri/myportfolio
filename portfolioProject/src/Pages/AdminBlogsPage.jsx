import React, { useEffect } from 'react'
import AdminBlogs from '../Components/AdminBlogs';
import { toast } from "react-toastify";
import styles from "./AdminAddProjectPage.module.css";
import SiderBar from "../Components/SiderBar";
import { useNavigate } from 'react-router-dom';
import FindMe from '../Components/FindMe';

const AdminBlogsPage = () => {
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
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.contactMe}>
        <FindMe />
      </div>
      <SiderBar />
      <AdminBlogs />
    </div>
  );
}

export default AdminBlogsPage
