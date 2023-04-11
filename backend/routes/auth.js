// Creating route fpr authentication and using User.js schema/model to take the type of data we need

const express = require('express')
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs');  // importing bcryptjs
const jwt = require('jsonwebtoken');    // importing jsonwebToken
const fetchuser = require('../middleware/fetchuser');    // importing fetchuser

const JWT_SECRET = "ThisIsMERNproject#10"   // server secrete key (not left open, should be kept safe)

// ---------------------------------------------------------------------------------------------//

// Route 1 : Creating a User using : POST "/api/auth/createUser". Doesn't require auth
router.post('/createUser', [
    // Validating the input content by user
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })],
    async (req, res) => {
        let success = false   // Showing success true/false in response
        // Handle error : If not error return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        // Check for the user with this email already exists
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success, error: "Email already exists" })
            }

            // Hashing password using salt and encrypting 
            const salt = await bcrypt.genSaltSync(10)
            const secPass = await bcrypt.hashSync(req.body.password, salt)

            // Create New User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            console.log(user)

            // Session Token (JWT token)
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            console.log(authToken)
            // res.json(user) // showing as response 
            let success = true
            res.json({ success, authToken }) // returning authorization token to user

        }
        // Catch error
        catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }

    })

// ---------------------------------------------------------------------------------------------//

// Route 2 : Authenticate a User using : POST "/api/auth/login". Doesn't require auth to login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can\'t be blank').exists()],
    async (req, res) => {
        let success = false   // Showing success true/false in response
        // Handle error : If not error return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // using d-structuring to get email and pass out of body
        const { email, password } = req.body

        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ error: "Enter valid credentials" })
            }
            // comparing pass to check
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Enter valid credentials" })
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            let success = true
            res.json({ success, authToken }) // returning authorization token to user
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
    })

// ---------------------------------------------------------------------------------------------//

// Route 3 : get logged-in user details : POST "/api/auth/getUser". Require auth to login
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router