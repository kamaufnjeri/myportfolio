import React, { useRef, useState, useCallback, useMemo } from "react";
import styles from "./AddProject.module.css"; // Import CSS module
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { handleMultiPartPostRequest, handlePostRequests } from "../Methods/handleApiRequests";
import { toast } from "react-toastify";
import Loading from "./Loading";

// Memoize the ReactQuill component to prevent unnecessary re-renders
const MemoizedReactQuill = React.memo(ReactQuill);

const AddBlog = () => {
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator
  const [showQuill, setShowQuill] = useState(true); // State to manage visibility of ReactQuill
  const [data, setData] = useState({
    title: "",
    content: "",
    bannerUrl: "",
  });
  // Function to insert image into editor
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
          const resp = await handleMultiPartPostRequest(
            "images/upload",
            formData
          );

          insertToEditor(resp.imageUrl);
        } catch (error) {
          console.log(error);
          toast.error("Error uploading image");
        } finally {
          setIsLoading(false); // Set loading state to false after image upload
         
        }
    };
    } else {
      try {
        setIsLoading(true);
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        const resp = await handleMultiPartPostRequest(
          "images/upload",
          formData
        );
        setData({...data, bannerUrl: resp.imageUrl});
      } catch (error) {
        console.log(error);
        toast.error("Error uploading banner image")
      } finally {
        setIsLoading(false);
      }
    }
    
  }, [handleMultiPartPostRequest, data]);


  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
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
    const resp = await handlePostRequests("blogs/addblog", data);
    if (resp.status === 200 || resp.status === 500) {
      toast.error(resp.data.message);
    } else if (resp.status === 201) {
      toast.success(resp.data.message);
      setData(prevState => ({
        ...prevState,
        title: "",
        content: "",
        bannerUrl: "",
      }));
      document.getElementById("banner").value = "";
      document.getElementById("title").value = "";
    } else {
      toast.error("Unknown error. Try again!")
    }
    setIsLoading(false);
    console.log(data);
  }
  return (
    <div className={styles.maincontent}>
      {isLoading && <Loading />} {/* Render loading indicator if isLoading is true */}
      <h2>Add a blog</h2>
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
            onChange={(e) => setData({...data, title: e.target.value})} />
        </div>
        <div className={styles.inputbox}>
          <label htmlFor="banner">
            Blog Banner <span>*</span>
          </label>
          <input
            type="file"
            accept="image"
            placeholder="Banner"
            id="banner"
            required
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleImageUpload(true, file);
              }
              
            }}
          />
        </div>
        <div className={styles.texteditor}>
          {showQuill &&
            <MemoizedReactQuill
            ref={editorRef}
            className={styles.editor}
            style={{ height: "30vh", marginBottom: "20px" }}
            modules={modules}
            value={data.content}
            onChange={(value) => setData({...data, content: value})}
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

export default AddBlog;
