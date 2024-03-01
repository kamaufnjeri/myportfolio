import React, { useEffect, useState } from "react";
import styles from "./AddProject.module.css"; // Import CSS module
import Select from "react-select";
import { handleGetRequests, handlePostRequests } from "../Methods/handleApiRequests";
import { toast } from "react-toastify";
import Loading from "./Loading";

// React component to handle adding projects
const AddProject = () => {
  const [tools, setTools] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(
    {
      title: "",
      description: "",
      sourceCodeUrl: "",
      websiteUrl: "",
      challenges: "",
      lessonsLearnt: "",
      imageUrl: "",
      toolsAndTechnologies: [],
    }
  );
  
  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setData({
      ...data,
      toolsAndTechnologies: selectedOptions.map(selectedOption => selectedOption.value)
    });
    console.log(data)
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true);
    const resp = await handlePostRequests("projects/addproject", data);
    if (resp.status === 200 || resp.status === 500) {
      toast.error(resp.data.message);
    } else if (resp.status === 201) {
      toast.success(resp.data.message);
    } else {
      toast.error("Unknown error. Try again!")
    }
    setData({
      title: "",
      description: "",
      sourceCodeUrl: "",
      websiteUrl: "",
      challenges: "",
      lessonsLearnt: "",
      imageUrl: "",
      toolsAndTechnologies: [],
    });
    setIsLoading(false);
    setSelectedOptions([]);
  }
  // fetch tools
  useEffect(() => {
    const fetchData = async () => {
        const resp = await handleGetRequests("projects/alltools");
        
        if (resp.status === 200) {
            setTools(resp.data.tools);
        }
        else {
            console.log(resp.data.error);
            toast.error(resp.data.message);
        }
    }
     fetchData();
  }, []);

  // creating options
  useEffect(() => {
    const options = tools.map((tool) => ({
      value: tool._id,
      label: tool.name,
    }));
    setOptions(options);
  }, [tools]);

  return (
    <div className={styles.maincontent}>
      {isLoading && <Loading />}
      <h2>Add a project</h2>
      <form className={styles.formbox} onSubmit={handleSubmit}> {/* Apply formbox class */}
        {/* Project title */}
        <div className={styles.inputbox}> {/* Apply inputbox class */}
          <label htmlFor="title">Project title <span>*</span></label>
          <input 
          type="text"
          value={data.title}
          onChange={(e) => {
            setData({ ...data, title: e.target.value})
          }}
          placeholder="Title"
          id="title"
          required
          />
        </div>
        {/* Project description */}
        <div className={styles.inputbox}> {/* Apply inputbox class */}
          <label htmlFor="description">Project description <span>*</span></label>
          <textarea
            id="description"
            required
            placeholder="Description"
            rows={6}
            value={data.description}
            onChange={(e) => {
              setData({ ...data, description: e.target.value})
            }}
          />
        </div>
        {/* Project source code url */}
        <div className={styles.inputbox}> {/* Apply inputbox class */}
          <label htmlFor="sourceCodeUrl">Project source code url <span>*</span></label>
          <input
            type="text"
            placeholder="Source code url"
            id="sourceCodeUrl"
            required
            value={data.sourceCodeUrl}
            onChange={(e) => {
              setData({ ...data, sourceCodeUrl: e.target.value})
          }}
          />
        </div>
        {/* Project website url */}
        <div className={styles.inputbox}> {/* Apply inputbox class */}
          <label htmlFor="websiteUrl">Project website url</label>
          <input
            type="text"
            placeholder="website url" 
            id="websiteUrl"
            value={data.websiteUrl}
            onChange={(e) => {
              setData({ ...data, websiteUrl: e.target.value})
            }}
          />
        </div>
        <div className={styles.inputbox}> {/* Apply inputbox class */}
          <label htmlFor="imageUrl">Project image url<span>*</span></label>
          <input 
          type="text"
          value={data.imageUrl}
          onChange={(e) => {
            setData({ ...data, imageUrl: e.target.value})
          }}
          placeholder="Image Url"
          id="imageUrl"
          required
          />
        </div>
        {/* Project challenges */}
        <div className={styles.inputbox}> {/* Apply inputbox class */}
          <label htmlFor="challenges">Project challenges</label>
          <textarea
            type="text"
            id="challenges"
            placeholder="Challenges"
            rows={6}
            value={data.challenges}
            onChange={(e) => {
              setData({ ...data, challenges: e.target.value})
            }}
          />
        </div>
        {/* Project Lessons Learnt */}
        <div className={styles.inputbox}> {/* Apply inputbox class */}
          <label htmlFor="lessonsLearnt">Project Lessons Learnt</label>
          <textarea
            type="text"
            placeholder="Lessons learnt"
            id="lessonsLearnt"
            rows={6}
            value={data.lessonsLearnt}
            onChange={(e) => {
              setData({ ...data, lessonsLearnt: e.target.value})
            }}
          />
        </div>
        {/* Project tools or technologies */}
        <div className={styles.inputbox}> {/* Apply inputbox class */}
          <label htmlFor="tools">Project tools or technologies <span>*</span></label>
          <Select
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            isMulti={true}
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

export default AddProject;
