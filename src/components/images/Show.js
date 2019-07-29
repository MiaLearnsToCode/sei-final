import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Show extends React.Component {
  constructor() {
    super()
    this.state = { image: {}, filterColor: null, text: null }
    this.filterReset = this.filterReset.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteNote = this.handleDeleteNote.bind(this)
  }

  generatePixels() {
    axios.post(`/api/images/${this.props.match.params.id}/pixels`, null, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ image: res.data }))
      .catch(() => this.props.history.push('/error'))
  }

  generateColors() {
    axios.post(`/api/images/${this.props.match.params.id}/colors`, null, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ image: res.data }))
      .catch(() => this.props.history.push('/error'))
  }

  getImage() {
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
      .catch(() => this.props.history.push('/error'))
  }

  componentDidMount() {
    this.getImage()
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

  filterReset() {
    this.setState({ filterColor: ''})
  }

  completed(pixel) {
    const data = {'ticked': true}
    axios.put(`/api/images/${this.props.match.params.id}/pixels/${pixel.id}`, data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getImage())
      .catch(() => this.props.history.push('/error'))
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = { text: this.state.text }
    axios.post(`/api/images/${this.props.match.params.id}/notes`, data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getImage())
      .then(() => this.setState({ text: ''}))
      .catch(() => this.props.history.push('/error'))
  }

  handleDelete() {
    axios.delete(`/api/images/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/dashboard'))
      .catch(() => this.props.history.push('/error'))
  }

  handleDeleteNote(e) {
    axios.delete(`/api/images/${this.props.match.params.id}/notes/${e.target.value}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getImage())
      .catch(() => this.props.history.push('/error'))
  }


  render() {
    if (!this.state.image.title) return null
    return(
      <div className="container">
        {
          !this.state.image.pixels[99] &&
          <img className="spinner" src="https://media3.giphy.com/media/kHHVb1kBX86vMNHXpg/giphy.gif?cid=790b76115d3edf3f616c5a6667c0645a&rid=giphy.gif" alt="Loading"/>
        }
        {
          this.state.image.pixels[99] &&
          <div>
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
                <button className="btn" onClick={this.filterReset}>Reset Filter</button>
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
                        className = "pixel c-hand"
                        style={
                          {
                            backgroundColor: this.state.filterColor === pixel.color && !pixel.ticked || !this.state.filterColor && !pixel.ticked ? pixel.color : '#34495E',
                            height: px,
                            width: px
                          }
                        }
                        onClick={() => this.completed(pixel)}
                      >
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
            <div>
              <h2> For a {Math.sqrt(this.state.image.pixels.length) * 2}x{Math.sqrt(this.state.image.pixels.length) * 2}mm design you will need: </h2>
              <div className='columns light-back'>
                {
                  this.uniqueColors(this.state.image.colors, 'color').map(color => {
                    return <div className='col-4' key={color.id}>
                      <span className="chip" style={{ backgroundColor: color.color}}>{color.color}</span>
                      <p>{color.length}mm for {color.stitches} stitches</p>
                    </div>
                  })
                }
              </div>
            </div>
            <div>
              <h2>Notes</h2>
              {
                this.state.image.notes.map(note => {
                  return <div key={note.id} className="card light-back">
                    <div className="card-header">
                      <div className="card-subtitle text-gray">{note.created_at}</div>
                      <button value={note.id} className="btn" onClick={this.handleDeleteNote}>✖️ </button>
                    </div>
                    <div className="card-body">{note.text}</div>
                  </div>
                })
              }
              <form className="form-group" onSubmit={this.handleSubmit}>
                <input
                  className="form-input"
                  type="text"
                  name="text"
                  onChange={this.handleChange}
                  value={this.state.text || ''}
                  placeholder="Make a note to yourself"
                />
                <button className="btn" type="submit">Add</button>
              </form>
            </div>
            <div>
              <button className="btn primary-btn" onClick={this.handleDelete}>Delete Project</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Show
