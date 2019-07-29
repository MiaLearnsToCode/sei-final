import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return(
    <div className="container">
      <section>
        <h1>Oops, something went wrong</h1>
        <Link to='/' className='btn'>Go back to the homepage</Link >
      </section>
    </div>
  )
}

export default Error
