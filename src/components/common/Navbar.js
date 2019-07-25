import React from 'react'
import Auth from '../../lib/Auth'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component{
  constructor() {
    super()

    this.state = {navbar: false}
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout() {
    Auth.logout()
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({navbar: !this.state.navbar})
  }

  componentDidMount() {
    Auth.isAuthenticated()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbar: false})
      Auth.isAuthenticated()
    }
  }

  render() {
    return(
      <header>
        <nav className="navbar">
          <section className="navbar-section">
          </section>
          <section className="navbar-center">
            <a href="#" className="btn btn-link">YARN</a>
          </section>
          <section className="navbar-section">
          </section>
        </nav>
        {
          Auth.isAuthenticated() &&
          <div className="navbar">
            <section className="navbar-section">
              <Link to="/dashboard" className="btn btn-link">DASHBOARD</Link>
            </section>
            <section className="navbar-center">
            </section>
            <section className="navbar-section">
              <a href="#" className="btn btn-link" onClick={this.logout}>LOGOUT</a>
            </section>
          </div>
        }

      </header>
    )
  }
}



export default withRouter(Navbar)
