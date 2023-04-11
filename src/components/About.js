import React from 'react'

const About = () => {

  return (
    <div className='container'>
      <h2 >About iNotebook </h2>
      <p className='lead my-4 '>
        <ul class="list-unstyled">
          <li className='my-2'>iNotebook is a web application that allows users to store and manage their notes in the cloud. With iNotebook, users can create, edit, and delete notes from anywhere, at any time, using a simple and intuitive interface. Our app provides a convenient way for users to keep track of their ideas, tasks, and reminders. </li>
          <li className='my-2'>Security is a top priority for us at iNotebook. We use bcrypt.js for password hashing and JSON Web Tokens (JWT) for authentication and authorization to ensure that user data is protected from unauthorized access. All notes are stored securely on our cloud server, and users can only access them by logging in with their credentials.</li>
          <li className='my-2'>Our app is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, which is a popular and robust stack for web development. We have used React.js for the frontend, providing a smooth and responsive user experience, while Express.js and Node.js power the backend. MongoDB is used as our database for storing notes and user data.</li>
          <li className='my-2'>We have also used several libraries and packages to enhance the functionality and user experience of our app. react-router-dom is used for client-side routing, allowing for smooth navigation within the app. Context API is used for state management, providing an efficient way to manage global state within the app. Font Awesome is used for beautiful icons, adding an aesthetic touch to the app. We have also included functionality for alerts, providing users with feedback and notifications.</li>
          <li className='my-2'>At iNotebook, we strive to provide our users with a safe, reliable, and user-friendly note-taking app that they can use to organize their thoughts and ideas. If you have any feedback or suggestions, we would love to hear from you. Thank you for choosing iNotebook for your note-taking needs.</li>
        </ul>
      </p>
    </div>
  )
}

export default About
