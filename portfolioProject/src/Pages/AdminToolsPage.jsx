import React, { useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./AdminAddProjectPage.module.css";
import SiderBar from "../Components/SiderBar";
import { useNavigate } from "react-router-dom";
import { handleGetRequests } from "../Methods/handleApiRequests";
import AdminTools from "../Components/AdminTools";
// Import handleGetRequests from your API file

const AdminToolsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await handleGetRequests("auth/verify");

        if (resp.status === 200) {
          // Do nothing, the user is authorized
        } else if (resp.status === 404) {
          navigate("/adminlogin");
        } else {
          throw new Error("Unexpected response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data! Please login");
        navigate("/adminlogin");
      }
    }

    fetchData();
  }, [navigate]); // Added navigate as a dependency to useEffect

  return (
    <div className={styles.dashboard}>
      <SiderBar />
      <AdminTools />
    </div>
  );
};

export default AdminToolsPage;
