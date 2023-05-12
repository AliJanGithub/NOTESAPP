import React from 'react'
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const Nottesitem = (props) => {
    const context=useContext(NoteContext);
    
  const{deletenote}=context
    const {note,updatenote}=props
  return (

<div class="col-md-3" style={{marginLeft:'20px'}} >
 
   <div class="card text-bg-dark my-3" style={{maxWidth: "18rem",minHeight:"13rem",marginLeft:'px'}}>
  <div class="card-header"></div>
  <div class="card-body">
  <h5 class="card-title">{note.tittle} </h5>
  <p class="card-text">{note.description}.</p>
  <p class="card-text">{note.tag}</p>
  <i class="fa-solid fa-trash" style={{color:"red"}} onClick={()=>deletenote(note._id)}></i>
  <i class="fa-solid fa-file-pen mx-3" onClick={()=>updatenote(note)}></i>

  </div>

   
  </div>
</div>

  )
}

export default Nottesitem;