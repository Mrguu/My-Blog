import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useCookies } from "react-cookie";
import SinglePageLoading from "../components/SingleLoading";

const Singleblog = ({ math }) => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [username, setUsername] = useState("");
  const userID = window.localStorage.getItem("userID");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blog/${id}`
        );
        setPost(response.data);
        if (response.data.userowner) {
          const userResponse = await axios.get(
            `http://localhost:5000/api/user/${response.data.userowner}`
          );
          setUsername(userResponse.data.username);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    const loadpage = () => {
      setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    };
    loadpage();
  }, [id]);

  const userOwner = post.userowner;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blog/${post._id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/blog/${post._id}`);
      navigate(`/blog/edit/${post._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  {
    return !isLoading || error ? (
      <SinglePageLoading />
    ) : (
      <div className="w-full h-full p-3 md:p-10 flex flex-col bg-[#253551] text-white gap-10">
        <div className="flex flex-col-reverse w-full justify-between gap-10">
          <div className="flex flex-col justify-between p-2 gap-10 w-full">
            <div className="text-xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-gray-700 bg-clip-text text-transparent">
              {post.title}
            </div>
            <div className="text-justify text-sm md:text-md text-gradient bg-gradient-to-r from-slate-200 to-gray-400 bg-clip-text text-transparent">
              {post.description}
            </div>
            <div className="flex md:flex-row flex-col gap-10 justify-between">
              <div className="flex flex-col gap-2 md:gap-5 justify-center ">
                <div className="text-xs md:text-sm font-bold">
                  Add by {username}
                </div>

                {post.updatedAt && (
                  <strong className="text-xs md:text-sm">
                    {formatDistanceToNow(new Date(post.updatedAt), {
                      addSuffix: true,
                    })}
                  </strong>
                )}
              </div>
              <div
                className={`p-2 md:w-auto w-[170px] border-2 rounded-xl border-sky-700 flex gap-5 ${
                  userOwner === userID && cookies.access_token
                    ? "inline-flex"
                    : "hidden"
                }`}>
                <Link
                  onClick={handleEdit}
                  className="flex gap-2 items-center text-xs md:text-sm font-bold text-pink-300 hover:text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                  Edit
                </Link>
                <div
                  onClick={handleDelete}
                  className="cursor-pointer flex gap-2 items-center text-xs md:text-sm font-bold text-pink-300 hover:text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4">
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete
                </div>
              </div>
            </div>
          </div>
          {post.image && (
            <div className="w-full rounded-xl overflow-hidden">
              <img src={`http://localhost:5000/${post.image}`} alt="" />
            </div>
          )}
        </div>
        <div>
          <div
            className="text-justify md:text-sm text-xs text-gradient bg-gradient-to-r from-slate-200 to-gray-400 bg-clip-text text-transparent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    );
  }
};

export default Singleblog;
