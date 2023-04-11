// code to update state of the context created (use context api)
import NoteContext from './noteContext'
import React, { useState } from 'react'
// import { json } from 'react-router-dom'

const NoteState = (props) => {
    const url = "http://localhost:5000"
    const notesInital = []
    const [notes, setNotes] = useState(notesInital)

    //_________________________________________________________________________________________________________________________________________________________________________________________//
    
    // get a note
    const getNote = async () => {
        // API call
        const response = await fetch(`${url}/api/notes/fetchAllNotes`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        // const json = response.json();

        const json = await response.json()
        // console.log(json)
        setNotes(json)
    }

    //___________________________________________________________________________________________________________________________________________________________________________________________//
    
    // add a note
    const addNote = async (title, description, tag) => {
        // console.log("Adding new note")
        // to do : api call
        // API call
        const response = await fetch(`${url}/api/notes/addNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json()
        setNotes(notes.concat(note))
        
    }

    //___________________________________________________________________________________________________________________________________________________________________________________________//

    // delete a note
    const deleteNote = async (id) => {
        // console.log("Deleting the note with id", id)
        // to do : api call
        // API call
        const response = await fetch(`${url}/api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)

        // to do : api call above
        const newNote = notes.filter((notes) => { return notes._id !== id })
        setNotes(newNote)
    }

    //___________________________________________________________________________________________________________________________________________________________________________________________//

    // edit a note
    const editNote = async (id, title, description, tag) => {
        // to do : api call
        // API call
        const response = await fetch(`${url}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        // console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client  
        for (let index = 0; index < newNotes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
        }
        setNotes(newNotes)
    }

    //___________________________________________________________________________________________________________________________________________________________________________________________//

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
            {/* Here all the childrens are covered in context */}
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState