import React, { useContext, useState } from 'react'
// import Notes from './Notes';
import NoteContext from '../context/notes/NoteContext'

const Addnote = () => {
  const context = useContext(NoteContext)
  const { addnotes } = context
  const [note, setnotes] = useState({
    tittle: '',
    description: '',
    tag: '',
  })
  const onchange = (e) => {
    setnotes({ ...note, [e.target.name]: e.target.value })
  }
  const clickhandle =async (e) => {
    e.preventDefault();
    await addnotes(note.tittle, note.description, note.tag)
    setnotes({
      tittle: '',
      description: '',
      tag: 'default',
    });
  }

  return (
    <div className="container">
      <h3> Notes</h3>

      <form action='/' method='post'>
        <label htmlFor="">Title</label>
        <div className="d-flex my-3">
          <input
            className="form-control" minLength={5}
            type="text"
            id="tittle"
            // value={note.tittle}
            name="tittle"
            onChange={onchange}
          />
        </div>
        <label htmlFor="">Description</label>

        <div className="d-flex my-3">
          {' '}

          <input
            className="form-control" minLength={5}
            type="text"
            id="description"
            name="description"
            // value={note.description}
            onChange={onchange}
          />
        </div>
        <label htmlFor="">tag</label>

        <div className="d-flex my-3">
          {' '}

          <input
            className="form-control" 
            type="text"
            id="tag"
            name="tag"
            // value={note.tag}
            onChange={onchange}
          />
        </div>
        <button disabled={note.tittle.length<5 || note.description.length < 5 } class="btn btn-primary" type="submit" onClick={clickhandle}>
          Add Note
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
          <h3 className="my-1">Your Notes</h3>
        </div>
      </form>
      {/* <Notes/> */}
    </div>
  )
}

export default Addnote
