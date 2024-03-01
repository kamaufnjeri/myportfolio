import React, { useState } from "react";
import styles from "./AddProject.module.css"; // Import CSS module
import { handlePostRequests } from "../Methods/handleApiRequests";
import { toast } from "react-toastify";
import Loading from "./Loading";

const AddTools = () => {
  const [data, setData] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await handlePostRequests("projects/addtool", data);
    //handle post errors
      if (resp.status === 200 || resp.status === 404 || resp.status === 500) {
        toast.error(resp.data.message);
      } else if (resp.status === 201) {
        console;
        toast.success(resp.data.message);
      } else {
        toast.error("Internal Server Error");
      }
    } catch (error) {
      console.log(error)
    }
    
  setData({ name: "" });
  setIsLoading(false);
  };

  return (
    <div className={styles.maincontent}>
      {isLoading && <Loading />}
      <h2>Add a tool</h2>
      <form className={styles.formbox} onSubmit={handleSubmit}>
        {/* Tool title */}
        <div className={styles.inputbox}>
          {/* Apply inputbox class */}
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

export default AddTools;
