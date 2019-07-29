import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

class Login extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, error: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/dashboard')
      })
      .catch(() => {
        this.setState({ error: 'Username or password is invalid'})
      })
  }

  handleChange(e) {
    const data = {...this.state.data, [e.target.name]: e.target.value}
    this.setState({ data, errors: ''})
  }

  render() {
    return (
      <div className="container columns">
        <div className="column col-6">
          <h1>Yarn: Embroidery Made Simple</h1>
          <p>Turn any image into an embroidery friendly design & keep track of your progress.</p>
        </div>
        <div className="form-group column col-4" >
          <form onSubmit={this.handleSubmit}>
            <h2>Sign In</h2>
            {this.state.error &&
              <div>
                <small className="is-erros">{this.state.error}</small>
              </div>
            }
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn input-group-btn"> Sign in </button>
            <div className="light-back">
              <p>New here?</p>
              <Link to="/register" className="c-hand">Register a new account</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
