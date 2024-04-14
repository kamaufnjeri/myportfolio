import React, { useEffect, useState } from "react";
import styles from "./AddProject.module.css"; // Import CSS module
import Select from "react-select";
import { handleGetRequests, handlePutRequests } from "../Methods/handleApiRequests";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdateProject = () => {
  // State variables
  const [tools, setTools] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    sourceCodeUrl: "",
    websiteUrl: "",
    challenges: "",
    lessonsLearnt: "",
    imageUrl: "",
    toolsAndTechnologies: [],
  });

  // Get project ID from URL params
  const { id } = useParams();

  // Fetch project details and set selected options when component mounts
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const resp = await handleGetRequests(`projects/allprojects/${id}`);
        if (resp.status === 200) {
          // Set project data
          setData(resp.data.project);

          // Fetch tool details for each tool ID and set selected options
          const selectedTools = await Promise.all(
            resp.data.project.toolsAndTechnologies.map(async (toolId) => {
              const toolresp = await handleGetRequests(`projects/alltools/${toolId}`);
              if (toolresp.status === 200) {
                return {
                  value: toolresp.data.tool._id,
                  label: toolresp.data.tool.name
                };
              }
              return null;
            })
          );

          // Filter out null values and set selected options
          setSelectedOptions(selectedTools.filter(tool => tool !== null));
        } else {
          toast.error("Error getting the project" + id);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Error fetching project");
      }
    };
    fetchProject();
  }, [id]);

  // Handle change in selected options
  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setData({
      ...data,
      toolsAndTechnologies: selectedOptions.map(selectedOption => selectedOption.value)
    });
    console.log(data);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const resp = await handlePutRequests(`projects/allprojects/${id}`, data);

      if (resp.status == 404 || resp.status == 500) {
        toast.error(resp.data.message);
      } else if (resp.status == 200) {
        toast.success(resp.data.message);
      } else {
        toast.error("Error updating project");
        console.log(resp);
      }
      // Handle response
    } catch (error) {
      console.log("Error updating" + error)
      toast.error("Error updating project");
    }
  };

  // Fetch tools
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await handleGetRequests("projects/alltools");
        if (resp.status === 200) {
          setTools(resp.data.tools);
        } else {
          console.log(resp.data.error);
          toast.error(resp.data.message);
        }
      } catch (error) {
        console.error("Error fetching tools:", error);
        toast.error("Error fetching tools");
      }
    };
    fetchData();
  }, []);

  // Create options for Select
  useEffect(() => {
    const options = tools.map((tool) => ({
      value: tool._id,
      label: tool.name,
    }));
    setOptions(options);
  }, [tools]);

  return (
    <div className={styles.maincontent}>
      <h2>Update a project</h2>
      <form className={styles.formbox} onSubmit={handleSubmit}>
        {/* Project fields */}
        <div className={styles.inputbox}>
          <label htmlFor="title">Project title <span>*</span></label>
          <input 
            type="text"
            value={data.title}
            onChange={(e) => {
              setData({ ...data, title: e.target.value })
            }}
            placeholder="Title"
            id="title"
            required
          />
        </div>
        <div className={styles.inputbox}>
          <label htmlFor="description">Project description <span>*</span></label>
          <textarea
            id="description"
            required
            placeholder="Description"
            rows={6}
            value={data.description}
            onChange={(e) => {
              setData({ ...data, description: e.target.value })
            }}
          />
        </div>
        <div className={styles.inputbox}> {/* Apply inputbox class */}
          <label htmlFor="videoUrl">Project Video Code</label>
          <textarea
            id="videoUrl"
            placeholder="Video Code"
            rows={6}
            value={data.videoUrl}
            onChange={(e) => {
              setData({ ...data, videoUrl: e.target.value})
            }}
          />
        </div>
        <div className={styles.inputbox}>
          <label htmlFor="sourceCodeUrl">Project source code url <span>*</span></label>
          <input
            type="text"
            placeholder="Source code url"
            id="sourceCodeUrl"
            required
            value={data.sourceCodeUrl}
            onChange={(e) => {
              setData({ ...data, sourceCodeUrl: e.target.value })
            }}
          />
        </div>
        <div className={styles.inputbox}>
          <label htmlFor="websiteUrl">Project website url</label>
          <input
            type="text"
            placeholder="website url" 
            id="websiteUrl"
            value={data.websiteUrl}
            onChange={(e) => {
              setData({ ...data, websiteUrl: e.target.value })
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
          placeholder="Image url"
          id="imageUrl"
          required
          />
        </div>
        <div className={styles.inputbox}>
          <label htmlFor="challenges">Project challenges</label>
          <textarea
            type="text"
            id="challenges"
            placeholder="Challenges"
            rows={6}
            value={data.challenges}
            onChange={(e) => {
              setData({ ...data, challenges: e.target.value })
            }}
          />
        </div>
        <div className={styles.inputbox}>
          <label htmlFor="lessonsLearnt">Project Lessons Learnt</label>
          <textarea
            type="text"
            placeholder="Lessons learnt"
            id="lessonsLearnt"
            rows={6}
            value={data.lessonsLearnt}
            onChange={(e) => {
              setData({ ...data, lessonsLearnt: e.target.value })
            }}
          />
        </div>
        {/* Project tools or technologies */}
        <div className={styles.inputbox}>
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

export default UpdateProject;
