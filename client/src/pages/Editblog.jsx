import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blog/${id}`
        );
        const postData = response.data;
        setTitle(postData.title);
        setDescription(postData.description);
        setImage(postData.image);
        setContent(postData.content);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    if (files && files.length > 0) {
      data.append("file", files[0]);
    }

    data.append("content", content);

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/blog/${id}`,
        data
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="w-full h-full bg-[#253551] p-3 md:p-10 flex flex-col items-center gap-10">
      <h1 className="text-xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-200 to-blue-700 bg-clip-text text-transparent text-center">
        Edit your blog post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gradient-to-r from-[#2f3859] to-[#564781] p-3 md:p-5 w-11/12 gap-5 rounded-xl shadow-2xl">
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
          className="p-4 rounded-lg bg-[#7850a0] placeholder-white outline-none text-white"
          type="text"
          rows="5"
          placeholder="Description..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <input
          className="p-4  rounded-lg bg-[#7850a0] placeholder-white  text-white"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            setFiles(e.target.files);
          }}
        />

        <ReactQuill
          className="mb-10 h-[180px] text-white "
          placeholder="write your content ...."
          theme="snow"
          value={content}
          onChange={(newvalue) => setContent(newvalue)}
        />
        <button className="bg-[#7850a0] hover:bg-sky-400 font-bold text-white text-xl p-2 rounded-xl">
          Edit Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
