import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentails, setCredentails] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()      // For page not to reload
    const { name, email, password } = credentails
    // API call (using fetch api)
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ name: credentails.name, email: credentails.email, password: credentails.password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      // save auth-token and re-direct
      // console.log(json.authtoken)
      localStorage.setItem('token', JSON.stringify(json.authToken))

      navigate('/')
      props.showAlert("Account created successfully", "success")

  }
  else {
      props.showAlert("Enter valid details", "danger")
  }

  }
  const onChange = (e) => {
    setCredentails({ ...credentails, [e.target.name]: e.target.value })
  }

  return (
    <div className='container w-50'>
      <h2 className='text-center'>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-3 my-5">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required autoComplete="on"/>
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required autoComplete="on"/>
        </div>

        <div id="emailHelp" className="form-text my-2">We'll never share your details with anyone else.</div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  )
}

export default Signup
