import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props
    return (
        <div className='col-md-3 '>
            <div className="card my-3 ">
                <div className="card-body ">

                    <div className="d-flex">
                        <div className="mr-auto p-2"><h5 className="card-title">{note?.title}</h5></div>

                        {/* Favicon for edit */}
                        <div className="p-2"><i className="fa-regular fa-pen-to-square"
                            onClick={() => {
                                updateNote(note)
                            }}>
                        </i></div>

                        {/* Favicon for delete */}
                        <div className="p-2"><i className="fa-solid fa-trash"
                            onClick={() => {
                                deleteNote(note?._id)
                                props.showAlert("Deleted successfully", "success")
                            }}>
                        </i></div>

                    </div>
                    <p className="card-text">{note?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
