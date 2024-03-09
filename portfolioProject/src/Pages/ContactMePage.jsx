import React, { useRef, useState } from "react";
import styles from "./ContactMePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { handlePostRequests } from "../Methods/handleApiRequests";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";

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
    <div className={styles.mainContent}>
      {isLoading && <Loading />}
      <h2>Contact me</h2>
      <p>
        Feel free to get in touch with me if you have any questions, feedback,
        or just want to say hello! 😊📧
      </p>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.formBox}>
        <input
          onChange={(e) => setData({ ...data, name: e.target.value })}
          type="text"
          required
          value={data.name}
          placeholder="Enter your name"
        />
        <input
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="text"
          required
          value={data.email}
          placeholder="Enter your email"
        />
        <textarea
          onChange={(e) => setData({ ...data, message: e.target.value })}
          type="text"
          required
          value={data.message}
          placeholder="Enter the message..."
        ></textarea>
        <button className={styles.sendBtn}>
          <FontAwesomeIcon icon={faPaperPlane} className={styles.sendIcon} />
          Send
        </button>
      </form>
      <div className={styles.findMe}>
        <p>Feel free to reach out through any of these platforms:</p>
        <div className={styles.icons}>
          <div className={styles.icon}>
            <Link
              to="https://github.com/kamaufnjeri"
              target="_blank"
              className={styles.link}
            >
              <img src="/github.png" alt="github image" />
            </Link>
            <span>Github</span>
          </div>

          <div className={styles.icon}>
            <Link
              to="mailto:kamaufnjeri2019@gmail.com"
              target="_blank"
              className={styles.link}
            >
              <img src="/gmail.png" alt="gmail image" />
            </Link>
            <span>Gmail</span>
          </div>

          <div className={styles.icon}>
            <Link
              to="https://www.linkedin.com/in/florence-kamau-696874241/"
              target="_blank"
              className={styles.link}
            >
              <img src="/linkedin.png" alt="linkedin image" />
            </Link>
            <span>Linkedin</span>
          </div>

          <div className={styles.icon}>
            <Link
              to="https://twitter.com/kamaufnjeri"
              target="_blank"
              className={styles.link}
            >
              <img src="/twitter.png" alt="twitter image" />
            </Link>
            <span>Twitter</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMePage;
