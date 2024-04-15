import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import styles from "./AddProject.module.css"; // Import CSS module
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { handleMultiPartPostRequest, handlePostRequests, handleGetRequests, handlePutRequests } from "../Methods/handleApiRequests";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

// Memoize the ReactQuill component to prevent unnecessary re-renders
const MemoizedReactQuill = React.memo(ReactQuill);

const UpdateBlog = () => {
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator
  const [showQuill, setShowQuill] = useState(true); // State to manage visibility of ReactQuill
  const [data, setData] = useState({
    content: '',
    title: "",
    bannerUrl: "",
  });
  // Get blog ID from URL params
  const { id } = useParams();
  // Function to insert image into editor
  // Fetch tools
  const token = localStorage.getItem("jwtToken");
  console.log('in react comp' + token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await handleGetRequests(`blogs/allblogs/${id}`);
        if (resp.status === 200) {
          console.log(resp.data.blog)
          setData(resp.data.blog);
        } else {
          console.log(resp.data.error);
          toast.error(resp.data.message);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Error fetching blog");
      }
    };
    console.log(data)
    fetchData();
  }, [setData, id]);
  const insertToEditor = useCallback((url) => {
    if (!editorRef.current) return;

    const range = editorRef.current.getEditor().getSelection();

    if (range) {
      const cursorPosition = range ? range.index : 0;
      editorRef.current
        .getEditor()
        .insertEmbed(cursorPosition, "image", url, Quill.sources.USER);
    }
  }, []);

  // Function to handle image upload

  const handleImageUpload = useCallback(async (isBannerImage = false, file = null) => {

    if (!isBannerImage) {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        setIsLoading(true);
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
          const token = localStorage.getItem('jwtToken');

          const resp = await handleMultiPartPostRequest(
            "images/upload",
            formData,
            token
          );

          insertToEditor(resp.imageUrl);
        } catch (error) {
          console.log(error);
          toast.error("Error uploading image");
        } finally {
          setIsLoading(false); // Set loading state to false after image upload

        }
      };
    }
  }, [handleMultiPartPostRequest, data]);


  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: () => {
          handleImageUpload(false, null)
        },
      },
    },

  }), []);


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true);
    const token = localStorage.getItem('jwtToken');

    const resp = await handlePutRequests(`blogs/allblogs/${id}`, data, token);
    if (resp.status === 404 || resp.status === 500) {
      toast.error(resp.data.message);
    } else if (resp.status === 200) {
      toast.success(resp.data.message);
    } else {
      toast.error("Unknown error. Try again!")
    }
    setIsLoading(false);


  }

  return (
    <div className={styles.maincontent}>
      {isLoading && <Loading />} {/* Render loading indicator if isLoading is true */}
      <h2>Update a blog</h2>
      <form className={styles.formbox} onSubmit={handleSubmit}>
        <div className={styles.inputbox}>
          <label htmlFor="title">
            Blog Title <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            required
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })} />
        </div>
        <div className={styles.texteditor}>
          {showQuill &&
            <MemoizedReactQuill
              ref={editorRef}
              className={styles.editor}
              style={{ height: "30vh", marginBottom: "20px" }}
              modules={modules}
              value={data.content}
              onChange={(value) => setData({ ...data, content: value })}
              placeholder="Start writing blog..."
            />}
        </div>
        <div className={styles.inputbox}>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
