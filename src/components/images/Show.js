import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Show extends React.Component {
  constructor() {
    super()
    this.state = { image: {}, filterColor: null }
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

  uniqueColors(array, key) {
    const unique = array.map(e => e[key]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => array[e]).map(e => array[e])
    return unique
  }

  filterColors(hex) {
    this.setState({ filterColor: hex })
  }

  render() {
    if (!this.state.image.title) return null
    return(
      <div className="container">
        {
          this.state.image.pixels[0] &&
            <div className="columns">
              <div className="column col-6">
                <h2>Filter stitches</h2>
                <p>Use these labels to highlight the stitches of the color you are working with</p>
                <div className="columns">
                  {
                    this.uniqueColors(this.state.image.colors, 'color').map(color => {
                      return <a
                        className="chip col-3 c-hand"
                        key={color.id}
                        style={{ backgroundColor: color.color}}
                        onClick={() => this.filterColors(color.color)}
                      >{color.color}</a>
                    })
                  }
                </div>
                <button className="btn">Reset filter</button>
              </div>
              <div className="column col-6">
                <div className='pixels-grid'>
                  {
                    this.sortPixels().map(pixel => {
                      const n = Math.sqrt(this.state.image.pixels.length)
                      const h = 500/n
                      const px = `${h}px`
                      return <div
                        key={pixel.id}
                        id={pixel.id}
                        style={
                          {
                            backgroundColor: this.state.filterColor === pixel.color || !this.state.filterColor  ? pixel.color : '#34495E',
                            height: px,
                            width: px,
                            border: '1px solid #212121'
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
        <div>
          <h2> For a {Math.sqrt(this.state.image.pixels.length) * 0.2}x{Math.sqrt(this.state.image.pixels.length) * 0.2}cm design you will need: </h2>
          {
            this.uniqueColors(this.state.image.colors, 'color').map(color => {
              return <div key={color.id}>
                <span className="chip" style={{ backgroundColor: color.color}}>{color.color}</span>
                <p>{color.length}cm for {color.stitches} stitches</p>
              </div>
            })
          }
        </div>
      </div>
    )
  }
}

export default Show
