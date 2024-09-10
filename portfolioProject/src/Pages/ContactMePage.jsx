import React, { useRef, useState } from "react";
import styles from "./ContactMePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { handlePostRequests } from "../Methods/handleApiRequests";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";
import FindMe from "../Components/shared/FindMe";
import GoToButton from "../Components/shared/GoToButton";

const ContactMePage = () => {
  // usestate to handle form data
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //check is valid email
  const isValidEmail = (email) => {
    const emailRegex =
      /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
    const isValid = emailRegex.test(email);
    return isValid;
  };
  //function to handle submit
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (isValidEmail(data.email)) {
      try {
        const response = await handlePostRequests(
          "contactme/sendmessage",
          data
        );

        if (response.status === 201) {
          setData({
            name: "",
            email: "",
            message: "",
          });
          console.log(response);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error sending message! Try again later");
      }
    } else {
      toast.error("Enter a valid email");
    }
    setIsLoading(false);
  };

  return (

    <div className={styles.contactBox}>
      {isLoading && <Loading />}
      <h1>Contact me</h1>
      <p>
        Feel free to get in touch with me if you have any questions, feedback,
        or just want to say hello!
      </p>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.formBox}>
          <div className={styles.inputCont}>
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              name="name"
              required
              value={data.name}
              placeholder="Enter your name"
            />
          </div>
          <div className={styles.inputCont}>
            <label htmlFor="email">Email</label>

            <input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="text"
              required
              name="email"
              value={data.email}
              placeholder="Enter your email"
            />
        </div>
        <div className={styles.inputCont}>
          <label htmlFor="message">Message</label>

          <textarea
            onChange={(e) => setData({ ...data, message: e.target.value })}
            type="text"
            required
            name="message"
            value={data.message}
            placeholder="Enter the message..."
          ></textarea>
        </div>

        <button className={styles.sendBtn}>
          <FontAwesomeIcon icon={faPaperPlane} className={styles.sendIcon} />
          Send
        </button>
      </form>
      <div>
        <GoToButton name='Blogs' url='/blogs' />
      </div>
    </div>

  );
};

export default ContactMePage;
