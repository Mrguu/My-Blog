import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const userID = window.localStorage.getItem("userID");

  const [title, setTitle] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    data.set("file", files[0]);
    data.append("content", content);
    data.set("userowner", userID);
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:5000/api/blog`, data);
      navigate("/");
      console.log(res.data);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };
  return (
    <div className="w-full h-full bg-[#253551] p-3 md:p-10 flex flex-col items-center gap-10">
      <h1 className="text-xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-200 to-blue-700 bg-clip-text text-transparent text-center">
        Here create your idea and share to your friends
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gradient-to-r from-[#2f3859] to-[#564781] p-3 md:p-5 w-11/12 gap-5  rounded-xl shadow-2xl">
        <input
          className="p-2 rounded-lg bg-[#7850a0] placeholder-white outline-none text-white"
          type="text"
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <textarea
          cols="30"
          className="p-2 rounded-lg bg-[#7850a0] placeholder-white outline-none text-white"
          type="text"
          rows="3"
          placeholder="Description..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <input
          className="p-2 rounded-lg bg-[#7850a0] placeholder-white  text-white"
          type="file"
          onChange={(e) => {
            setFiles(e.target.files);
          }}
        />
        <ReactQuill
          className="mb-10 h-[180px] text-white"
          theme="snow"
          value={content}
          onChange={(newvalue) => setContent(newvalue)}
        />
        <button className="bg-[#7850a0] hover:bg-sky-400 font-bold text-white text-xl p-2 rounded-xl">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
