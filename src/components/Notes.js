import React, { useContext,useEffect, useRef,useState} from 'react'
import noteContext from "../context/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    
  const [note, setNote] = useState({ etitle: '', edescription: '', etag: '' });
  
  const{notes,getNotes,modnote} = context;
  useEffect(()=>{
    getNotes()
  },[])
  const ref  = useRef(null)
  const refClose  = useRef(null)
  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
  const handleClick = (e) => {
    console.log("Updating the note...",note)
    modnote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    
  //   plusnote(note.etitle, note.edescription,note.etag);
   };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
    <AddNote/>
    <button ref={ref} type="button" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>

      <div className="container my-3">
        <h1>Add a Note</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value = {note.etitle} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value = {note.edescription}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
        </div>
        
        {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
      </div>
    </form>
    </div>e
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled= {note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>

      <div className="container row my-3">
  <h2>Your Notes  </h2>
  <div className = 'container'> 
  {notes.length===0 && "No Notes to display"}
  </div>
  {notes.map((note)=>{
return <NoteItem note ={note} updateNote = {updateNote} key ={note._id}/>;
  })}
    </div>
    </>
  )
}

export default Notes
