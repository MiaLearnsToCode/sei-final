import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Panel from './Panel'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {images: []}
  }

  componentDidMount() {
    axios.get('/api/images', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ images: res.data }) )
      .catch(err => console.log(err))
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
          <div className="projects-list columns">
            {
              this.state.images.map(image => {
                return <Panel key={image.id} {...image}/>
              })
            }
          </div>
        }

      </div>
    )
  }
}

export default Index
