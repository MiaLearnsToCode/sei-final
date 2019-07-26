import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Panel from './Panel'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {images: [], searchBox: ''}
    this.handleChange = this.handleChange.bind(this)
    this.filter = this.filter.bind(this)
  }

  componentDidMount() {
    axios.get('/api/images', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ images: res.data }) )
      .catch(err => console.log(err))
  }

  handleChange(e) {
    this.setState({searchBox: e.target.value})
  }

  filter() {
    const regexp = new RegExp(this.state.searchBox, 'i')
    return this.state.images.filter(project => regexp.test(project.title))
  }

  render() {
    console.log(this.state)
    return(
      <div className="container">
        <h1>My Projects</h1>
        {
          !this.state.images &&
          <div className="empty-state">
            <p className="title h5">Nothing to see here</p>
            <p className="subtitle">Click the button to start a new project:</p>
            <div>
              <button className="btn">New Project</button>
            </div>
          </div>
        }
        {
          this.state.images[0] &&
          <div>
            <div className="input-group input-inline">
              <input className="form-input" type="text" placeholder="Search your projects" onChange={this.handleChange} size='40'/>
            </div>
            <div className="projects-list columns">
              {
                this.filter().map(image => {
                  return <Panel key={image.id} {...image}/>
                })
              }
            </div>
          </div>
        }

      </div>
    )
  }
}

export default Index
