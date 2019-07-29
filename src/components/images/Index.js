import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Panel from './Panel'
import { Link } from 'react-router-dom'
import { TiPlusOutline} from 'react-icons/ti'

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
      .catch(() => this.props.history.push('/error'))
  }

  handleChange(e) {
    this.setState({searchBox: e.target.value})
  }

  filter() {
    const regexp = new RegExp(this.state.searchBox, 'i')
    return this.state.images.filter(project => regexp.test(project.title))
  }

  render() {
    return(
      <div className='container'>
        <div className='dashboard-header'>
          <h1>Your Projects</h1>
          <Link to='/projects/new'> <TiPlusOutline /> </Link>
        </div>
        {
          !this.state.images[0] &&
          <div className='empty-state'>
            <p className='title h5'>Nothing to see here</p>
            <p className='subtitle'>Click the button to start a new project:</p>
            <div>
              <Link to='/projects/new' className='btn'>New Project</Link>
            </div>
          </div>
        }
        {
          this.state.images[0] &&
          <div>
            <div className='input-group input-inline'>
              <input className='form-input' type='text' placeholder='Search your projects' onChange={this.handleChange} size='40'/>
            </div>
            <div className='projects-list columns'>
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
