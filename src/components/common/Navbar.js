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
            <Link to='/' className="c-hand">
              <img src="https://media2.giphy.com/media/j6e8XZajQJhYKm1XEx/giphy.gif?cid=790b76115d39be776d4f546e55ff2fc6&rid=giphy.gif" />
            </Link>
          </section>
          <section className="navbar-section">
          </section>
        </nav>
        {
          Auth.isAuthenticated() &&
          <div className="navbar-loggedin">
            <div className="navbar">
              <section className="navbar-section">
                <Link to="/dashboard">DASHBOARD</Link>
              </section>
              <section className="navbar-center">
              </section>
              <section className="navbar-section">
                <a onClick={this.logout} className="c-hand">LOGOUT </a>
              </section>
            </div>
            <hr />
          </div>
        }

      </header>
    )
  }
}



export default withRouter(Navbar)
