import React,{useEffect} from 'react'
// import NoteContext from '../context/notes/NoteContext'


import { useNavigate } from "react-router-dom";

const Contact=()=> {
  // const a =useContext(NoteContext)
  let navigate=useNavigate()
  useEffect(() => {
    if(!localStorage.getItem("authtoken"))
      {navigate('/login')
  }
  }, [])
  return (
    <div>here is contact and notes age is </div>
  )
}
export default Contact;