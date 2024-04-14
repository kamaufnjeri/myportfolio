import React, { useEffect, useState } from 'react';
import styles from "./AdminProjects.module.css";
import { handleDeleteRequests, handleGetRequests } from "../Methods/handleApiRequests";
import {toast} from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Link } from "react-router-dom";

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [blogId, setBlogId] = useState(null);
  
    const handleCancel = () => {
      // Close the modal without deleting
      setBlogId(null);
      setShowModal(false);
    };
  
    // Sample data for projects
    useEffect(() => {
      const fetchData = async () => {
          const resp = await handleGetRequests("blogs/allblogs");
          if (resp.status === 200) {
              setBlogs(resp.data.blogs);
          }
          else {
              console.log(resp.data.error);
              toast.error(resp.data.message);
          }
      }
       fetchData();
    }, [blogs])
  
    // deleting project
    const handleDelete = async (id) => {
      const resp = await handleDeleteRequests(`blogs/allblogs/${id}`);
  
      if (resp.status === 404 || resp.status === 500) {
        toast.error(resp.data.message);
      } else if (resp.status === 200) {
        toast.success(resp.data.message);
        setShowModal(false);
      } else {
        toast.error("Error deleting! Try again!");
      }
  
    }
    return (
      <div className={styles.maincontent}>
        {/* Heading */}
        <h2>My blogs</h2>
  
        {/* Table structure */}
        <div className={styles.table}>
          {/* Table header */}
          <div className={styles.tablerow}>
            <h3>Number</h3>
            <h3>Name/Title</h3>
            <h3>Actions</h3>
          </div>
  
          {/* Mapping through projects to display each project */}
          {blogs.map((blog, index) => (
            <div className={styles.tablerow} key={blog._id}>
              {/* Displaying project details */}
              <p>{index + 1}</p>
              <p>{blog.title}</p>
              {/* Placeholder for edit/update buttons */}
              <div className={styles.actionbtns}>
                <Link to={`/admindashboard/blogs/${blog._id}`}><button>Edit</button></Link>
                <button onClick={() => {
                    setShowModal(true);
                    setBlogId(blog._id);
                }}>Delete</button>
                <DeleteConfirmationModal
                  isOpen={showModal}
                  id={blogId}
                  onDelete={(e) => handleDelete(blogId)}
                  onCancel={handleCancel}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default AdminBlogs
