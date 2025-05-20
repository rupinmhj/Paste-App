import React, { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useParams } from "react-router-dom";
import { BsCopy } from "react-icons/bs";
const ViewPaste = () => {
  const {id}=useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.filter((p)=>p._id===id)[0]||{};
  return (
    <div className="flex flex-col items-center  w-[100dvw]">
      <div className="flex gap-7  ">
      <input
        className="px-4 py-2 mb-1 rounded-xl mt-4"
        type="text"
        placeholder="Enter title here"
        value={paste.title}
        disabled
        // onChange={(e) => setTitle(e.target.value)}
      />
     
    </div>

    <div className="relative">
        <textarea
        className="rounded-xl mt-4 min-w-[400px] p-4 pt-8 bg-black opacity-85 outline-none focus:outline-blue-600"
        value={paste.content}
        placeholder="Enter content here"
        disabled
        // onChange={(e)=>setValue(e.target.value)}
        rows={20}
      />
         <BsCopy  onClick={() =>
                    navigator.clipboard
                      .writeText(paste.content)
                      .then(() => toast.success("Copied to Clipboard"))
                  }
        className="absolute right-4 top-8 cursor-pointer hover:text-gray-400" />
        
    </div>
    </div>
  )
}

export default ViewPaste
