import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5001";
    const notesInitial = []
    // Hardcoding notes 
    // const notesInitial = [
    //     {
    //         "_id": "66c48e638e4208a2e4eaaf12",
    //         "user": "66c465f49714f5065fb637b8",
    //         "title": "My title",
    //         "description": "This was the first note",
    //         "tag": "General",
    //         "date": "2024-08-20T12:38:59.009Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "66c48ee78e4208a2e4eaaf14",
    //         "user": "66c465f49714f5065fb637b8",
    //         "title": "Second",
    //         "description": "I like to play basketball",
    //         "tag": "General",
    //         "date": "2024-08-20T12:41:11.460Z",
    //         "__v": 0
    //     }
    // ];
// Getting notes 
    const [notes, setNotes] = useState(notesInitial);
    const getNotes = async () => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNTk1ZDE0NDY1YjMzZTZjMjY5NTFlIn0sImlhdCI6MTcyNDIyNDk3N30.iIZ2VokctqI6lLzISP0sRLo7Fl1aczbrFm6DE05tyeA"
            },
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }
    // Adding notes
    const plusnote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNTk1ZDE0NDY1YjMzZTZjMjY5NTFlIn0sImlhdCI6MTcyNDIyNDk3N30.iIZ2VokctqI6lLzISP0sRLo7Fl1aczbrFm6DE05tyeA"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        // Adding new note to the state
        const note = {
            "_id": "66c48ee78e4208a2e4eaaf14",
            "user": "66c465f49714f5065fb637b8",
            "title": title,
            "description": description,
            "tag": tag,
            "date": new Date().toISOString(),
            "__v": 0
        };
        setNotes([...notes, note]);
    };

    // Deleting notes
    const minusnote = async(id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNTk1ZDE0NDY1YjMzZTZjMjY5NTFlIn0sImlhdCI6MTcyNDIyNDk3N30.iIZ2VokctqI6lLzISP0sRLo7Fl1aczbrFm6DE05tyeA"
            }
        });
        const json = await response.json();
        console.log(json)
        console.log("Deleting note with id" + id);
        const newNotes = notes.filter((note) =>  note._id !== id );
        setNotes(newNotes);
    };

    // Editing notes
    const modnote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNTk1ZDE0NDY1YjMzZTZjMjY5NTFlIn0sImlhdCI6MTcyNDIyNDk3N30.iIZ2VokctqI6lLzISP0sRLo7Fl1aczbrFm6DE05tyeA"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
    setNotes(newNotes);
    };
    
    return ( 
        <NoteContext.Provider value={{ notes, plusnote, minusnote, modnote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
//     const updatedNotes = notes.map((note) => {
//         if (note._id === id) {
//             return { ...note, title, description, tag };
//         }
//         return note;
//     });
//     setNotes(updatedNotes);
// };
// import React,{ useState } from "react";
// import NoteContext from "./noteContext";
// // import { set } from "mongoose"; 

// const NoteState = (props) => {
//     const host = "http://localhost:5001"
//     const notesInitial  = [
//         {
//           "_id": "66c48e638e4208a2e4eaaf12",
//           "user": "66c465f49714f5065fb637b8",
//           "title": "My title",
//           "description": "This was the first note",
//           "tag": "General",
//           "date": "2024-08-20T12:38:59.009Z",
//           "__v": 0
//         },
//         {
//           "_id": "66c48ee78e4208a2e4eaaf14",
//           "user": "66c465f49714f5065fb637b8",
//           "title": "Second",
//           "description": "I like to play basketball",
//           "tag": "General",
//           "date": "2024-08-20T12:41:11.460Z",
//           "__v": 0
//         }
      

//     ]
//     // const s1 = {
//     //     "name": "Harry",
//     //     "class": "5b"
//     // };
//     // const [state, setState] = useState(s1);

//     // const update = () => {
//     //     setTimeout(() => {
//     //         setState({
//     //             "name": "Nilabh",
//     //             "class": "A2"
//     //         });
//     //     }, 1000);
//     // };

//     // return (
//     //     <NoteContext.Provider value={{ state: state, update: update }}>
//     //         {props.children}
//     //     </NoteContext.Provider>
//     // );
//     const[notes,setNotes]= useState(notesInitial);
//     //Addding notes
//     const plusnote = async(title,description,tag)=>{
//            // API CALL 
//            const response =  await fetch(`${host}/api/notes/addnote/${id}`,{
//             method:"POST",
//             headers:{
//                 'Content-Type': 'application/json',
//                 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNTk1ZDE0NDY1YjMzZTZjMjY5NTFlIn0sImlhdCI6MTcyNDIyNDk3N30.iIZ2VokctqI6lLzISP0sRLo7Fl1aczbrFm6DE05tyeA"
//             },
//             body: JSON.stringify({title,description,tag})
//         });
//         // const json = response.json();
//     }
//       const note = {
//             "_id": "66c48ee78e4208a2e4eaaf14",
//             "user": "66c465f49714f5065fb637b8",
//             "title": title,
//             "description": description,
//             "tag": tag,
//             "date": "2024-08-20T12:41:11.460Z",
//             "__v": 0
//           };
//         setNotes(notes.concat(note));
//     }
//     // Deleting notes
//     const minusnote = (id)=>{
//         console.log("Deleting note with id"+ id);
//         const newNotes = notes.filter((note)=>{return note._id!==id})
//         setNotes(newNotes);
//     } 
//     //Editing notes
//     const modnote = async (id,title,description,tag)=>{
//         // API CALL 
//         const response =  await fetch(`${host}/api/notes/updatenote/${id}`,{
//             method:"POST",
//             headers:{
//                 'Content-Type': 'application/json',
//                 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNTk1ZDE0NDY1YjMzZTZjMjY5NTFlIn0sImlhdCI6MTcyNDIyNDk3N30.iIZ2VokctqI6lLzISP0sRLo7Fl1aczbrFm6DE05tyeA"
//             },
//             body: JSON.stringify({title,description,tag})
//         });
//         const json = response.json();
//     }
    //     for (let index = 0; index < array.length; index++) {
    //         const element = notes[index];
    //         if(element._id==id){
    //             notes[index].title = title;
    //             notes[index].description = description;
    //             notes[index].tag = tag;
    //         }
    //        break;
    //     }
    // setNotes(notes);

//     return (
//             <NoteContext.Provider value={{notes,plusnote,minusnote,modnote}}>
//                 {props.children}
//             </NoteContext.Provider>
//         );



