import { useState } from 'react'
import Home from './Components/Home'
import Navbar from './Components/navbar'
import Paste from './Components/Paste'
import ViewPaste from './Components/ViewPaste'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router=createBrowserRouter(
  [
    {
      path:'/',
      element:
      <div>
        <Navbar/>
        <Home />
      </div>
    },
    {
      path:'/pastes',
      element:
      <div>
        <Navbar />
        <Paste />
      </div>
    },
    {
      path:'/pastes/:id',
      element:
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    }
  ]
)
function App() {


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
