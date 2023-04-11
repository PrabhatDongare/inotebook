const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');    // importing fetchuser
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

// ---------------------------------------------------------------------------------------------//

// Route 1 : Get All the notes using : GET "/api/notes/fetchAllNotes".  require to login
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ---------------------------------------------------------------------------------------------//

// Route 2 : Add a new Note using : POST "/api/notes/addNote".  require to login
router.post('/addNote', fetchuser, [
    // Validating the input content by user
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('description', 'Title must be at least 5 characters').isLength({ min: 5 })],
    async (req, res) => {

        try {
            // things we will get from user
            const { title, description, tag } = req.body

            // if there are errors, return BAD request and error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({ title, description, tag, user: req.user.id })
            const savedNote = await note.save()
            res.json(savedNote)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
    })

// ---------------------------------------------------------------------------------------------//

// Route 3 : Update an existing note using : PUT "/api/notes/updateNote".  require to login
// For updation PUT request is used 
router.put('/updateNote/:id', fetchuser, async (req, res) => {

    try {
        // using d-structuring to bring all data
        const { title, description, tag } = req.body

        // Create a new Object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Check for user authorization

        // if note doesn't exists
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        // if user trying to access someone else note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // if both above conditions are false, then user is authentic and accessing his notes
        // now update and (new : true) if new entry added
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ---------------------------------------------------------------------------------------------//

// Route 4 : Delete an existing note using : DELETE "/api/notes/deleteNote".  require to login
// For updation DELETE request is used 
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {

    try {
        // Check for user authorization
        // find the note to be deleted  and delete it 
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        // if user is deleting his note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // if both above conditions are false, then user is authentic and accessing his notes
        // now update and (new : true) if new entry added
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router