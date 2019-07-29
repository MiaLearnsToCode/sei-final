import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {data: {}, errors: {}}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = {...this.state.data, [e.target.name]: e.target.value}
    const errors = {...this.state.errors, [e.target.name]: ''}
    this.setState({data, errors})
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data}))
  }

  render() {
    return(
      <div className="form-group" >
        <form onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
          <label className="form-label">Username</label>
          <input
            className="form-input"
            value= {this.state.data.username || ''}
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
          {this.state.errors.username && <small className="is-error">{this.state.errors.username}</small>}
          <label className="form-label">Email</label>
          <input
            className="form-input"
            value= {this.state.data.email || ''}
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
          />
          {this.state.errors.email && <small className="is-error">{this.state.errors.email}</small>}
          <label className="form-label">Password</label>
          <input
            className="form-input"
            value= {this.state.data.password || ''}
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          {this.state.errors.password && <small className="is-error">{this.state.errors.password}</small>}
          <label className="form-label">Password Confirmation</label>
          <input
            className="form-input"
            value= {this.state.data.password_confirmation || ''}
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            onChange={this.handleChange}
          />
          {this.state.errors.password_confirmation && <small className="is-error">{this.state.errors.password_confirmation}</small>}
          <div>
            <br />
            <button className="btn input-group-btn"> Sign up </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Register
