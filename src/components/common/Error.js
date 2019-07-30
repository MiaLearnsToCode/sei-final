import React from 'react'
import { Link } from 'react-router-dom'

// catch page
const Error = () => {
  return(
    <div className='container'>
      <section>
        <h1>Oops, something went wrong</h1>
        <br />
        <Link to='/' className='btn'>Go back to the homepage</Link >
      </section>
    </div>
  )
}

export default Error
