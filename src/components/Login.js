import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentails, setCredentails] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()      // For page not to reload
        // API call (using fetch api)
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentails.email, password: credentails.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save auth-token and re-direct
            localStorage.setItem('token', JSON.stringify(json.authToken))
            props.showAlert("Logged in Successfully", "success")
            navigate('/')
        }
        else {
            props.showAlert("Enter valid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentails({ ...credentails, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-3 container w-50' >
            <div>
                <h2 className='text-center'>Login to continue to iNotebook</h2>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3 my-5 ">
                        <label htmlFor="email" className="form-label ">Email address</label>
                        <input type="email" value={credentails.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3 my-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={credentails.password} className="form-control" id="password" name="password" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary"  >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
