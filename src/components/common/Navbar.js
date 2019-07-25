import React from 'react'
import { withRouter } from 'react-router-dom'

class Navbar extends React.Component{

  render() {
    return(
      <header className="navbar">
        <section className="navbar-section">
          <a href="#" className="btn btn-link">YARN</a>
        </section>
        <section className="navbar-center">
        </section>
        <section className="navbar-section">
          <a href="#" className="btn btn-link">DROPDOWN</a>
        </section>
      </header>
    )
  }
}



export default withRouter(Navbar)
