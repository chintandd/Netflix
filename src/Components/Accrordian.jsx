import { useState } from "react";
import { Plus } from "lucide-react";
import { X } from "lucide-react";

const Accrordian = ({qes,ans}) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="item h-auto relative w-full cursor-pointer ">
      <div
        onClick={() => setExpand(!expand)}
        className="title w-full h-20 flex items-center py-5 justify-between px-8 border-b-1 border-black bg-[#2D2D2D] hover:bg-[#454444da] ease duration-200" 
      >
        <p className="text-base md:text-xl lg:text-2xl  font-[my-font-rg]">
          {qes}
        </p>
        {expand ? <X /> : <Plus />}
      </div>
      <div
        className={`content px-8 h-0 ${expand && "h-auto py-5"} ease duration-150 w-full bg-[#2D2D2D]`}
      >
        {expand && (
          <p className="text-md lg:text-lg font-[my-font-rg]">
           {ans}
          </p>
        )}
      </div>
    </div>
  );
};

export default Accrordian;
