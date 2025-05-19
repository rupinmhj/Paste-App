import React, { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
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
     <div className="flex gap-7 place-content-evenly ">
      <input
        className="p-2 rounded-xl mt-4"
        type="text"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createPaste} >
        {
            pasteId?"Update My Paste":"Create My Paste"
        }
      </button>
    </div>

    <div>
        <textarea
        className="rounded-xl mt-4 min-w-[400px] p-4"
        value={value}
        placeholder="Enter content here"
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        />
    </div>
    </>
  );
};

export default Home;
