import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context     // D-structuring

    const [note, setNote] = useState({title:"", description:"", tag:""})
    const handleClick = (e) => {
        e.preventDefault()      // For page not to reload
        addNote(note.title, note.description, note.tag)
        setNote({title:"", description:"", tag:""})     // making fields blank again
        props.showAlert("Note added successfully", "success")
        
    }
    
    // whatever is written in text field put that into props of note
    const onChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value})      // '...' means leave it how it is and make changes
    }

    return (
        <div className="container my-2">
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3 my-4">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag  </label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={5} required value={note.tag}/>
                </div>
                <button  type="submit" disabled={note.title.length<3 || note.description.length<5 || note.tag.length<3} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                <small className='mx-3'>( min 5 characters req. in each above fields )</small>
            </form>
        </div>
    )
}

export default AddNote
