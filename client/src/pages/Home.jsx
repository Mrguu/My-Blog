import React, { useEffect, useState } from "react";
import home from "../img/home.jpg";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";
import CardLoading from "../components/Card-Loading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog`);
        setPosts(res.data);
      } catch (err) {
        console.log("Error fetching data:", err);
        setError(err);
      }
    };
    fetchData();
    const loadpage = () => {
      setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    };
    loadpage();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-10 bg-[#253551] p-3 md:p-10">
      <div
        className="w-full h-[200px] md:h-[250px] px-2 p-2 md:px-8 flex flex-col gap-3 md:gap-10 justify-center bg-sky-400 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${home})` }}>
        <div className="text-xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-200 to-gray-700 bg-clip-text text-transparent">
          My Blog
        </div>
        <div className="text-md md:text-2xl font-bold text-gradient bg-gradient-to-r from-blue-200 to-gray-700 bg-clip-text text-transparent">
          You're not alone. Learn from other leaders that are serving in the
          trenches.
        </div>
      </div>
      {!isLoading || error ? (
        <div className="flex flex-wrap w-full items-center justify-center gap-10">
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </div>
      ) : (
        <div className="flex flex-wrap w-full items-center justify-center gap-10">
          {posts.map((post) => {
            const username = post.userowner?.username || "Unknown User";
            return (
              <Link
                to={`/single/${post._id}`}
                key={post._id}
                className="w-11/12 md:w-[300px] h-auto md:h-[450px] flex-col items-center flex gap-5 rounded-xl bg-[#10497c] text-white p-5 shadow-2xl">
                <div className="w-full">
                  {
                    <img
                      className="w-[300px] h-[150px]"
                      src={`http://localhost:5000/${post.image}`}
                      alt=""
                    />
                  }
                </div>

                <div className="flex flex-col  justify-between h-full p-2 gap-5 w-full">
                  <h1 className="line-clamp-2 text-md md:text-lg font-bold text-gradient bg-gradient-to-r from-blue-200 to-blue-700 bg-clip-text text-transparent">
                    {post.title}
                  </h1>
                  <p className="my-2 text-xs line-clamp-4 text-[#95b0df]">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs flex flex-col text-[#c1cbdc]">
                      <p className="text-xs">
                        <strong>Add by {username}</strong>
                      </p>
                      <p>
                        <strong>
                          {formatDistanceToNow(new Date(post.updatedAt), {
                            addSuffix: true,
                          })}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
//
