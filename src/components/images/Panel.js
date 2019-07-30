import React from 'react'
import { Link } from 'react-router-dom'

const Panel = ({title, url, pixels, difficulty, id}) => {
  // VARIABLES THAT CONTROL THE PROGRESS BAR
  const all = pixels.length
  const tickedArray = pixels.filter(pixel => pixel.ticked)
  const ticked = tickedArray.length
  const progress = (ticked * 100)/all

  return(
    <div className="panel col-3">
      <div className="panel-header text-center">
        <figure className="avatar avatar-xl"><img src={url} alt="Avatar"/></figure>
      </div>
      <div className="panel-body">
        <div className="tile tile-centered">
          <div className="tile-content">
            <h4 className="bold">{title}</h4>
          </div>
        </div>
        <div className="tile tile-centered">
          <div className="tile-content">
            <h5>Difficulty:</h5>
            <div className="chip">{difficulty.level}</div>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="tile tile-centered">
          <div className="tile-content">
            <div className="title text-bold">You have completed:</div>
            <progress
              className="progress"
              value={ticked === 0 ? 0 : progress}
              max="100"
            >
            </progress>
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <Link to={`/projects/${id}`} className="btn">Continue this project</Link>
      </div>
    </div>
  )
}

export default Panel
