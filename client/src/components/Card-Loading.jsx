import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardLoading = () => {
  return (
    <div className="flex flex-col gap-5 w-11/12 md:w-[300px] h-auto md:h-[450px] rounded-xl bg-[#10497c] p-3">
      <div className="w-full">
        <Skeleton height={160} />
      </div>
      <div>
        <Skeleton height={30} />
      </div>
      <div>
        <Skeleton count={4} />
      </div>
      <div className="flex flex-col items-start">
        <div>
          <Skeleton width={100} />
        </div>
        <div>
          <Skeleton width={100} />
        </div>
      </div>
    </div>
  );
};

export default CardLoading;
