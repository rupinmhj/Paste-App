import React, { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useParams } from "react-router-dom";
const ViewPaste = () => {
  const {id}=useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.filter((p)=>p._id===id)[0]||{};
  return (
    <div>
      <div className="flex gap-7 place-content-evenly ">
      <input
        className="p-2 rounded-xl mt-4"
        type="text"
        placeholder="Enter title here"
        value={paste.title}
        disabled
        // onChange={(e) => setTitle(e.target.value)}
      />
     
    </div>

    <div>
        <textarea
        className="rounded-xl mt-4 min-w-[400px] p-4"
        value={paste.content}
        placeholder="Enter content here"
        disabled
        // onChange={(e)=>setValue(e.target.value)}
        rows={20}
        />
    </div>
    </div>
  )
}

export default ViewPaste
