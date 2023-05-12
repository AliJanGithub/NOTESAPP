import React,{useContext,useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from "react-router-dom";
const About=()=> {
  const a=useContext(NoteContext)
  let navigate=useNavigate()
  useEffect(() => {
    if(!localStorage.getItem("authtoken"))
      {navigate('/login')
  }
  }, [])
  
  return (
    <div>

   <div>this is for {a.name} he is {a.age}</div>
    </div>
  )
}
export default About;