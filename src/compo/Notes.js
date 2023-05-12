import React, { useContext, useState, useEffect, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Nottesitem from './Nottesitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'


const Notes = () => {
  const navigate=useNavigate();


  const context = useContext(NoteContext)
  const { notes, getnotes,editnote } = context
  useEffect(() => { 
   if(window.localStorage.getItem("authtoken")){
    getnotes();

   }else{
navigate("/login")
   }

 

    
    //react-hooks/exhaustive-deps
  },[])
 
  const updatenote = (currentnote) => {
    ref.current.click()
    setnotes({id:currentnote._id,etittle:currentnote.tittle,edescription:currentnote.description,etag:currentnote.tag})
  }

  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setnotes] = useState({
    etittle: '',
    edescription: '',
    etag: '',
    id:''
  })
  const onchange = (e) => {
    setnotes({ ...note, [e.target.name]: e.target.value })

  }
  const clickhandle = (e) => {
    console.log(note)
  editnote(note.id,note.etittle,note.edescription,note.etag)
    refclose.current.click()
    
    // setnotes({
    //   tittle: '',
    //   description: '',
    //   tag: 'default',
    //   id:''
    // });
  }












  return (
    <>
      <Addnote />
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        // tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
               Edit
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
               <form action="/"  >
                <label htmlFor="">Title</label>
                <div className="d-flex my-3">
                  <input
                    className="form-control"
                    type="text"
                    id="etittle"
                    value={note.etittle}
                    name="etittle"
                    onChange={onchange}
                  />
                </div>
                <label htmlFor="">Description</label>
 
                <div className="d-flex my-3">
                  {' '}
                  <input
                    className="form-control"
                    type="text"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onchange}
                  />
                </div>
                <label htmlFor="">tag</label>

                <div className="d-flex my-3">
                  {' '}
                  <input
                    className="form-control"
                    type="text"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                  />
                </div>
                <button
                  className="btn btn-primary d-none"
                  type="submit"

                  onClick={clickhandle}
                >
                  Button
                </button>
                <div
                  className="container"
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    fontSize: '20px',
                  }}
                >
                  {/* <h3 className="my-1">Your Notes</h3> */}
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                ref={refclose}
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" disabled={note.etittle.length<5 || note.edescription.length<5}  onClick={clickhandle} class="btn btn-primary">
                update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className=" container row my-3"
        style={{
          display: 'flex',
          marginLeft: '50px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
       
 {console.log(typeof notes)}
        {notes.map((note) => {
        // {Array.isArray(notes) && notes.map((note) => {
          return (
            <Nottesitem updatenote={updatenote} key={note._id} note={note} />
          )
        })}
      </div>
    </>
  )
}

export default Notes
   