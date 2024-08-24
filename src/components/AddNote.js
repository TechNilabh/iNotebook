import React, { useContext, useState } from 'react';
import noteContext from '../context/noteContext';

const AddNote = () => {
  const context = useContext(noteContext);
  const { plusnote } = context;
  
  const [note, setNote] = useState({ title: '', description: '', tag: 'default' });
  
  const handleClick = (e) => {
    e.preventDefault();
    plusnote(note.title, note.description,note.tag);
    setNote({ title: '', description: '', tag: 'default' })
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
    <form>

      <div className="container my-3">
        <h1>Add a Note</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" value={note} name="description" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" value={note} id="tag" name="tag" onChange={onChange} />
        </div>
        
        <button disabled= {note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </div>
    </form>
    </div>
  );
};

export default AddNote;
