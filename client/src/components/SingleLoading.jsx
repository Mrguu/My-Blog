import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SinglePageLoading = () => {
  return (
    <div className="w-full h-full p-3 md:p-10 flex flex-col bg-[#253551] gap-10">
      <div className="w-full ">
        <Skeleton height={400} />
      </div>
      <div>
        <Skeleton height={30} />
      </div>
      <div>
        <Skeleton count={4} />
      </div>
      <div className="flex flex-col ">
        <div>
          <Skeleton width={150} />
        </div>
        <div>
          <Skeleton width={150} />
        </div>
      </div>
      <div>
        <Skeleton count={10} />
      </div>
    </div>
  );
};

export default SinglePageLoading;
