import React from 'react'

const Panel = ({title, url, pixels, difficulty}) => {
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
        <hr />
        <div className="tile tile-centered">
          <div className="tile-content">
            <div className="title text-bold">You have completed:</div>
            <progress
              className="progress"
              value={pixels.length}
              max="100"
            >
            </progress>
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <button className="btn">Continue this project</button>
      </div>
    </div>
  )
}

export default Panel
