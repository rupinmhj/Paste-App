import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes:localStorage.getItem("pastes")
  ?JSON.parse(localStorage.getItem("pastes"))
  :[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste=action.payload;
      state.pastes.push(paste);
       localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully!!")

    },
    updateToPastes: (state,action) => {
     const paste=action.payload;
      const idToFind = paste._id || paste.id;
     const index=state.pastes.findIndex((item)=>{
        // Handle both cases: items with _id or id
        const itemId = item._id || item.id;
        return itemId === idToFind;
      });
     if(index>=0){
      state.pastes[index]=paste;
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("Paste updated!!")
     }
     else{
      toast.error("Paste not found")
     }
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes");
    },
    removeFromPastes:(state,action)=>{
        const index = state.pastes.findIndex(paste => paste.id === action.payload.id);
      const pasteId=action.payload;
      console.log(pasteId);
      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste deleted!!")
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer