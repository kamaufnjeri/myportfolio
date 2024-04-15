import React from "react";
import styles from "./SiderBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  AddBlogButton,
  AddFolderButton,
  AddToolsButton,
  BlogsIcon,
  FolderIcon,
  SignOutButton,
  ToolsIcon,
} from "./Icons";
import { handleGetRequests, handlePostRequests } from "../Methods/handleApiRequests";
import { toast } from "react-toastify";

//component for sidebar
const SiderBar = () => {
  //logout function
  const navigate = useNavigate();
  const logout = async () => {
    const resp = await handleGetRequests("logout");
    if (resp.status === 200) {
      // successful in fetching logout url
      toast.success(resp.data.message);
      navigate("/");
    } else if (resp.status === 500) {
      // error
      toast.error(resp.data.message);
    } else {
      toast.error("Could not logout. Try again");
    }
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.icondetail}>
        <Link to="/admindashboard">
          <FolderIcon />
        </Link>
        <span>Projects</span>
      </div>
      <div className={styles.icondetail}>
        <Link to="/admindashboard/addproject">
          <AddFolderButton />
        </Link>
        <span>Add project</span>
      </div>
      <div className={styles.icondetail}>
      <Link to="/admindashboard/tools">
      <ToolsIcon />
      </Link>
        <span>Tools</span>
      </div>
      <div className={styles.icondetail}>
        <Link to="/admindashboard/addtool">
          <AddToolsButton />
        </Link>
        <span>Add tool</span>
      </div>
      <div className={styles.icondetail}>
        <Link to="/admindashboard/blogs">
          <BlogsIcon />
        </Link>
        <span>Blogs</span>
      </div>
      <div className={styles.icondetail}>
        <Link to="/admindashboard/addblog">
          <AddBlogButton />
        </Link>
        <span>Add blog</span>
      </div>
      <div className={styles.icondetail}>
        <SignOutButton onClick={logout} />
        <span>Signout</span>
      </div>
    </div>
  );
};

export default SiderBar;
