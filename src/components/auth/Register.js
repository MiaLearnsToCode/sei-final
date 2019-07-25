import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {data: {}, erros: {}}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }) )
  }

  handleChange(e) {
    const data = {...this.state.data, [e.target.name]: e.target.value}
    this.setState({data, errors: {}})
  }

  render() {
    return(
      <div className="form-group" >
        <form onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <label className="form-label">Email</label>
          <input
            className="form-input"
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
          <label className="form-label">Password Confirmation</label>
          <input
            className="form-input"
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            onChange={this.handleChange}
          />
          <button className="btn input-group-btn"> Sign up </button>
        </form>
      </div>
    )
  }
}

export default Register
