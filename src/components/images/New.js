import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class New extends React.Component {
  constructor() {
    super()

    this.state = {data: {}, erros: {}, difficulties: []}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getDifficulty() {
    axios.get('/api/difficulties', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ difficulties: res.data}))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getDifficulty()
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/images', this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/dashboard'))
      .catch(err => this.setState({ errors: err.response.data.errors }) )
  }

  handleChange(e) {
    e.preventDefault()
    console.log(typeof e.currentTarget.value)
    const data = {...this.state.data, [e.target.name]: e.target.value}
    this.setState({data, errors: {}})
  }

  render() {
    console.log(this.state)
    if (!this.state.data && !this.state.difficulties[0]) return null
    return(
      <div className="columns">
        <div className="col-7">
          {
            !this.state.data.url &&
            <div className="empty">
              <p className="empty-title h5">Image Preview</p>
            </div>
          }
          {
            this.state.data.url &&
            <div className="empty">
              <img src={this.state.data.url}/>
            </div>
          }
          <img />
        </div>
        <div className="col-5 form-group" >
          <form onSubmit={this.handleSubmit}>
            <h2>Create a new project</h2>
            <label className="form-label">Title</label>
            <input
              className="form-input"
              type="text"
              name="title"
              placeholder="Project title"
              onChange={this.handleChange}
            />
            <label className="form-label">Url</label>
            <input
              className="form-input"
              name="url"
              placeholder="Image url (preferrably ending in .jpeg)"
              onChange={this.handleChange}
            />
            <label className="form-label">Difficulty Level</label>
            <div className="btn-group btn-group-block">
              {
                this.state.difficulties[0] &&
                this.state.difficulties.map(difficulty => {
                  return <button key={difficulty.id}
                    name='difficulty_id'
                    value={difficulty.id}
                    className={`btn ${this.state.data.difficulty === difficulty.id ? 'btn-selected' : ''}`}
                    onClick={this.handleChange}
                  >{difficulty.level}</button>
                })
              }
            </div>
            <button className="btn input-group-btn"> Create </button>
          </form>
        </div>
      </div>
    )
  }
}

export default New
