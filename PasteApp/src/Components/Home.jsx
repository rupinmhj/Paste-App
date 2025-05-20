import React, { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { BsCopy } from "react-icons/bs";
const notify = () => toast('Added paste');

const Home = () => {
  const [title, setTitle] = useState("");
  const [value,setValue]=useState('');
  const [searchParams,setSearchParams]=useState(new URLSearchParams(window.location.search));
  const pasteId=searchParams.get("pasteId");
  const dispatch=useDispatch();
  const allPastes=useSelector((state)=>state.paste.pastes);

   useEffect(()=>{
      if(pasteId){
        const paste=allPastes.find((p)=>p._id===pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    },[pasteId])
  const createPaste=()=>{
      if (!title.trim()) {
    toast.error("Title is empty");
    return;
  }

  if (!value.trim()) {
    toast.error("Content is empty");
    return;
  }

    const paste={
        title:title,
        content:value,
        _id:pasteId|| Date.now().toString(36),
        createdAt:new Date().toISOString(),
    }
   
    if(pasteId){
        //update
        dispatch(updateToPastes(paste));
    }
    else{
        //create
        dispatch(addToPastes(paste));
    }

    //After create or update
    setTitle('');
    setValue('');
    setSearchParams(new URLSearchParams());


  }
  return (
    <>
     <div className="flex gap-7 justify-center items-center ">
      <input
        className="px-4 py-2 mb-1 rounded-xl mt-4"
        type="text"
        required
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      
        
      />
      <button className="border border-white bg-gray-800"
      onClick={createPaste} >
        {
            pasteId?"Update My Paste":"Create My Paste"
        }
      </button>
    </div>

    <div className=" justify-center flex">
      <div className="relative">
           <textarea
           required
        className="rounded-xl mt-4 min-w-[400px] p-4 pt-8 focus:bg-black opacity-85 outline-none focus:outline-blue-600"
        value={value}
        placeholder="Enter content here"
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
  
        />
        <BsCopy  onClick={() =>
                    navigator.clipboard
                      .writeText(value)
                      .then(() => toast.success("Copied to Clipboard"))
                  }
        className="absolute right-4 top-8 cursor-pointer hover:text-gray-400" />
      </div>
       
    </div>
    </>
  );
};

export default Home;
