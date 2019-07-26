import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Show extends React.Component {
  constructor() {
    super()
    this.state = { image: {}}
  }

  generatePixels() {
    axios.post(`/api/images/${this.props.match.params.id}/pixels`, null, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ image: res.data }))
      .catch(err => console.log(err))
  }

  generateColors() {
    axios.post(`/api/images/${this.props.match.params.id}/colors`, null, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ image: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    axios.get(`/api/images/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ image: res.data }))
      .then(() => {
        if (this.state.image.pixels.length === 0) {
          this.generatePixels()
        }
        if (this.state.image.colors.length === 0) {
          this.generateColors()
        }
      })
      .catch(err => console.log(err))
  }

  sortPixels() {
    return this.state.image.pixels.sort(function(a, b){
      return a.id-b.id
    })
  }
  render() {
    if (!this.state.image.title) return null
    return(
      <div className="container">
        {
          this.state.image.pixels[0] &&
            <div className="columns">
              <div className="column col-6">
                <h2>Filter stitches through colors</h2>
                {
                  this.state.image.colors.map(color => {

                    return <span className="chip" key={color.id} style={{ backgroundColor: color.color}}>{color.color}</span>
                  })
                }
              </div>
              <div className="column col-6">
                <div className='pixels-grid'>
                  {
                    this.sortPixels().map(pixel => {
                      const rgb = `rgb${pixel.color}`
                      const n = Math.sqrt(this.state.image.pixels.length)
                      const h = 500/n
                      const px = `${h}px`
                      return <div
                        key={pixel.id}
                        id={pixel.id}
                        style={
                          {
                            backgroundColor: rgb,
                            height: px,
                            width: px
                          }

                        }
                      >
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
        }
        <div></div>
      </div>
    )
  }
}

export default Show
