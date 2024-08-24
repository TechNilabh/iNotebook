import React, { useContext } from 'react'
import noteContext from "../context/noteContext"
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { note, updateNote} = props;
    const {minusnote} = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div class="card-body">
                <div className="d-flex align-items-center">

                    <h5 class="card-title">{note.title}</h5>
                    <i class="fa-solid fa-trash-can mx-2" onClick={()=>{minusnote(note._id)}}></i>
                    <i class="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
                    <p class="card-text">{note.description}</p>
                </div>
            </div>
        </div>

    )
}

export default NoteItem
