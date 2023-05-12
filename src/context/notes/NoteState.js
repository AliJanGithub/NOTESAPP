import React,{useState} from "react";
import NoteContext from "./NoteContext";
import {useCookies} from "react-cookie"
const NoteState=(props)=>{
const host=`http://localhost:4001`
const notesinitialize=[]
const [notes, setnotes] = useState(notesinitialize) 
const [_,setcookies]=useCookies("auth-token")


const getnotes= async ()=>{ 
  
  const response = await fetch(`${host}/api/notes/fetchnotes`, {
    method: "GET", // *GET, POST, PUT, DELETE, et c.
   
    headers: {
      "Content-Type": "application/json",
    //  "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMzI0YTVhMmExYTYzZjViZjE1YjdhIn0sImlhdCI6MTY4MTA3MzMxN30.6Ss1I8BcT4_Otirrj7DnWPKTklYtah5GUf8NM1l5vqc"
    "auth-token":window.localStorage.getItem("authtoken")
  },
    
   
  });
  const json=await response.json()
console.log(response)
setnotes(json)
}






  




const addnotes= async(tittle,description,tag)=>{

console.log("hhhhhhh")
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST", // *GET, POST, PUT, DELETE, et c.
   
    headers: {
      "Content-Type": "application/json",
    //  "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMzI0YTVhMmExYTYzZjViZjE1YjdhIn0sImlhdCI6MTY4MTA3MzMxN30.6Ss1I8BcT4_Otirrj7DnWPKTklYtah5GUf8NM1l5vqc"
    "auth-token":window.localStorage.getItem("authtoken")

    },
    
    body: JSON.stringify({tittle,description,tag}), // body data type must match "Content-Type" header
  });
const json=await response.json();
console.log("addnote is in control",json)
  // const note={
  //   "_id": "643326416daefb00acab545c",
  //   "user": "643324a5a2a1a63f5bf15b7a",
  //   "tittle": tittle,
  //   "description": description,
  //   "tag": tag,
  //   "date": "2023-04-09T20:55:29.146Z",
  //   "__v": 0
  // }
  const note=json;
  console.log(notes)
  setnotes(notes.concat(note))
  console.log(setnotes)

}






  const deletenote=async(id)=>{
    // const response = await fetch(`${host}/api/notes/delete/${id}`, {
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, et c.
     
      headers: {
        "Content-Type": "application/json",
      //  "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMzI0YTVhMmExYTYzZjViZjE1YjdhIn0sImlhdCI6MTY4MTA3MzMxN30.6Ss1I8BcT4_Otirrj7DnWPKTklYtah5GUf8NM1l5vqc"
    "auth-token":window.localStorage.getItem("authtoken")

      },
      
     
    });
    const json=await response.json()
  console.log(response)

   const newnotes=notes.filter((note)=>{return note._id!==id})
   setnotes(newnotes)
  }


















  const editnote= async (id,tittle,description,tag)=>{

  
    // const response = await fetch(`${host}/api/notes/update/${id}`, {
    const response = await fetch(`${host}/api/notes/update/${id}`, {  
      method: "PUT", // *GET, POST, PUT, DELETE, et c.643736c7f06bdf0499a05b55
     
      headers: {
        "Content-Type": "application/json",
        // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMzI0YTVhMmExYTYzZjViZjE1YjdhIn0sImlhdCI6MTY4MTA3MzMxN30.6Ss1I8BcT4_Otirrj7DnWPKTklYtah5GUf8NM1l5vqc"
    "auth-token":window.localStorage.getItem("authtoken")

      },
      
      body: JSON.stringify({tittle,description,tag}), // body data type must match "Content-Type" header
    });
    const json= await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
       //logic to edit in notes     
       let newnotes= await JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id===id){ 
        newnotes[index].tittle=tittle;
        newnotes[index].description=description;
        newnotes[index].tag=tag;    
        break;
      }
      
    }
    setnotes(newnotes)

  }

return(
<NoteContext.Provider   value={{notes,setnotes,addnotes,getnotes,deletenote,editnote}}>
    {props.children}
</NoteContext.Provider>
)
    
}
export default NoteState;