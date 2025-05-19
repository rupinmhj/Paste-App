import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import {Link} from "react-router-dom"

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
    <div>
      <input
        type="search"
        className="mt-4 min-w-[600px] rounded-2xl h-8 pl-4"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-4 m-4">
        {filterData.length > 0 &&
          filterData.map((paste) => (
            <div className="border " key={paste?._id}>
              <div className="">{paste.title}</div>
              <div className="">{paste.content}</div>
              <div className="flex mt-2 justify-around">
                <button>
                  <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                  </button>
                <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                <button>
                  <Link to={`/pastes/${paste?._id}`}>View</Link>
                  </button>
                <button
                  onClick={() =>
                    navigator.clipboard
                      .writeText(paste?.content)
                      .then(() => toast.success("Copied to Clipboard"))
                  }
                >
                  Copy
                </button>
                <button>Share</button>
              </div>
              <div className="">{paste.createdAt}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
