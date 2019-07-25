import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Login extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, errors: ''}
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
      <div className="form-group">
        <h2>Sign In</h2>
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
        <button className="btn btn-primary"> Sign in </button>
        <p>New here?</p>
        <a>Register here</a>
      </div>
    )
  }
}

export default Login
