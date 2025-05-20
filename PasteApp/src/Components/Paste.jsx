import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };
  return (
    <div className="w-[100dvw] flex justify-center">
      <div className="max-w-[60%]">
        <input
          type="search"
          className="mt-4 px-4 ml-4 py-6 lg:min-w-[600px] rounded-2xl h-8 pl-4"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col  m-4 border border-gray-400 pt-2 lg:min-w-[800px] min-w-[500px]">
          <div className="flex w-full justify-center text-[20px] font-bold py-6 ">
          My Pastes
          </div>
          {filterData.length > 0 &&
            filterData.map((paste) => (
              <div
                className="border-y  justify-between gap-6 py-4 pl-6 pr-4 flex border-gray-400"
                key={paste?._id}
              >
                <div className="flex flex-col gap-2  flex-1 justify-start items-start pl-2">
                  <div className="font-semibold text-[18px]">{paste.title}</div>
                  <div className="text-left">{paste.content}</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex mt-2 justify-around gap-2">
                    <button className="bg-opacity-30 border size-[32px] px-2 py-1  text-white border-white bg-gray-600 ">
                      <Link
                        to={`/?pasteId=${paste?._id}`}
                        className="text-white"
                      >
                        <FaRegEdit />
                      </Link>
                    </button>
                    <button
                      className="bg-opacity-30 border size-[32px] px-2 py-1 border-white bg-gray-600 "
                      onClick={() => handleDelete(paste?._id)}
                    >
                      <MdDeleteOutline />
                    </button>
                    <button className="bg-opacity-30 border size-[32px] px-2 py-1 border-white bg-gray-600 ">
                      <Link to={`/pastes/${paste?._id}`} className="text-white">
                        <FaRegEye />
                      </Link>
                    </button>
                    <button
                      className="bg-opacity-30 border size-[32px] px-2 py-1 border-white bg-gray-600 "
                      onClick={() =>
                        navigator.clipboard
                          .writeText(paste?.content)
                          .then(() => toast.success("Copied to Clipboard"))
                      }
                    >
                      <FaRegCopy />
                    </button>
                    <button
                      className="bg-opacity-30 border size-[32px] px-2 py-1 border-white bg-gray-600"
                      onClick={() => {
                        const shareUrl = `${window.location.origin}/pastes/${paste?._id}`;
                        const shareData = {
                          title: paste.title,
                          text: "Check out this paste!",
                          url: shareUrl,
                        };

                        if (navigator.share) {
                          navigator
                            .share(shareData)

                            .catch((error) =>
                              toast.error("Share cancelled or failed")
                            );
                        } else {
                          navigator.clipboard.writeText(shareUrl);
                          toast("Sharing not supported, link copied instead!");
                        }
                      }}
                    >
                      <FaRegShareSquare />
                    </button>
                  </div>

                  <div className="relative py-3 ml-6">
                    {new Date(paste.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    <div className="absolute top-[18px] left-[-22px]">
                      <SlCalender />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Paste;
