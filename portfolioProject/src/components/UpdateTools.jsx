import React, { useEffect, useState } from "react";
import styles from "./AddProject.module.css"; // Import CSS module
import { handleGetRequests, handlePostRequests, handlePutRequests } from "../Methods/handleApiRequests";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdateTools = () => {
  // get id from url
  const { id } = useParams();
  const [data, setData] = useState({ name: ''});

  // to input original data to the input fields
  useEffect(() => {
    const fetchData = async () => {
      const resp = await handleGetRequests(`projects/alltools/${id}`);

      if (resp.status == 404 || resp.status == 500) {
        toast.error(resp.data.message);
      } else if (resp.status == 200) {
        setData(resp.data.tool);
      } else {
        console.log(resp)
        toast.error("Unknown error");
      }
    }

    fetchData();
  }, []);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // submit data
    const resp = await handlePutRequests(`projects/alltools/${id}`, data);

    console.log(resp)

    if (resp.status === 404 || resp.status === 500) {
      toast.error(resp.data.message);
    } else if (resp.status === 200) {
      setData(resp.data.tool);
      toast.success(resp.data.message);
    } else {
      toast.error("Unknown error");
    }
  }

  return (
    <div className={styles.maincontent}>
      <h2>Edit Tool</h2>
      <form className={styles.formbox} onSubmit={handleSubmit}>
        <div className={styles.inputbox}>
          <label htmlFor="name">
            Tool or Technology name <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            id="name"
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            required
          />
        </div>
        {/* Submit button */}
        <div className={styles.inputbox}>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTools;
