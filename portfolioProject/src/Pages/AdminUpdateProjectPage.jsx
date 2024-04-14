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
    async function fetchData() {
      try {
        const resp = await handleGetRequests("auth/verify");

        if (resp.status === 200) {
          // Do nothing, the user is authorized
        } else if (resp.status === 404) {
          navigate("/adminlogin");
        } else {
          // incase of an unknown error create a new error
          throw new Error("Unexpected response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data! Please login");
        // Handle errors here, like displaying an error message or redirecting to home
        navigate("/adminlogin");
      }
    }

    fetchData();
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
