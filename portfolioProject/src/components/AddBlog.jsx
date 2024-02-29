import React, { useRef, useState } from "react";
import styles from "./AddProject.module.css"; // Import CSS module
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { handleMultiPartPostRequest } from "../Methods/handleApiRequests";
import { toast } from "react-toastify";

const AddBlog = () => {
  const editorRef = useRef(null);

  // Function to handle image upload
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const data = await handleMultiPartPostRequest(
          "images/upload",
          formData
        );

        insertToEditor(data.imageUrl);
      } catch (error) {
        console.log(error);
        toast.error("Error uploading image");
      }
    };
  };

  // Function to insert image into editor
  const insertToEditor = (url) => {
    if (!editorRef.current) return;

    const range = editorRef.current.getEditor().getSelection();

    if (range) {
      const cursorPosition = range ? range.index : 0;
      editorRef.current
        .getEditor()
        .insertEmbed(cursorPosition, "image", url, Quill.sources.USER);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload, // Custom image handler
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const banner = formData.get("banner");

    // Access content from ReactQuill
    const content = editorRef.current.getEditor().root.innerHTML;

    // Append content to form data
    formData.append("content", content);

    // Clear input fields
    // Example: Submit form data using axios
    try {
      const data = await handleMultiPartPostRequest("blogs/addblog", formData);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Error adding blog");
    }
    document.getElementById("title").value = "";
    document.getElementById("banner").value = "";
    editorRef.current.getEditor().setContents([]);
  };
  return (
    <div className={styles.maincontent}>
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
            name="title"
          />
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
            name="banner"
          />
        </div>
        <div className={styles.texteditor}>
          <ReactQuill
            ref={editorRef}
            className={styles.editor}
            style={{ height: "30vh", marginBottom: "20px" }}
            modules={modules}
          />
        </div>
        <div className={styles.inputbox}>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
