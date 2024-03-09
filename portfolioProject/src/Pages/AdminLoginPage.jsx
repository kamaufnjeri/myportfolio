import React, { useRef, useState } from "react";
import styles from "./forms.module.css";
import Button from "../Components/Button";
import { handlePostRequests } from "../Methods/handleApiRequests";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// admin login page components
export default function AdminLoginPage() {
  //state to take in email and password
  const [data, setData] = useState({ email: "", password: "" });

  //variable to naviage
  const navigate = useNavigate();

  //reference for email password
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  //function to handle submit

  // Function to focus input on span click
  const focusInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  //handle sub,ition of data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handlePostRequests("login", data);

      // check it has the response data
      if (response.status === 201) {
        toast.success(
          `${response.data.message}: Hi ${response.data.user.email}!`
        );
        navigate("/admindashboard");
      } else {
        toast.error(
          `${response.response.data.message}: ${response.response.data.error}`,
          {}
        );
      }
    } catch (error) {
      toast.error("Failed to login! Try Again");
    }
    setData({ email: "", password: "" });
  };

  return (
    <div className={styles.main}>
      <h2>Admin Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.inputbox}>
          <input
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="text"
            required
            ref={emailRef}
            value={data.email}
          />
          <span className={styles.label} onClick={() => focusInput(emailRef)}>
            Enter Email
          </span>
        </div>
        <div className={styles.inputbox}>
          <input
            ref={passwordRef}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
            required
            value={data.password}
          />
          <span
            className={styles.label}
            onClick={() => focusInput(passwordRef)}
          >
            Enter Password
          </span>
        </div>
        <Button type="submit" name="Login" />
      </form>
    </div>
  );
}
