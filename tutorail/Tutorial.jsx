import React from 'react'
import ReactPlayer from 'react-player'
import tutorial from '../../images/tutorial.mp4'
import './Tutorail.css'
function Tutorial() {
  return (
    <div className='tut-main fluid-container' >
        <div className='row'>
          <div className='col-md-12'>
            {/* <div className="video"> */}
               <video  controls className='Videowidth'>
               <source src={tutorial} type="video/ogg"/>
               </video>
        {/* <ReactPlayer url={tutorial} controls={true} /> */}
            {/* </div> */}

          </div>
        </div>
    </div>
  )
}

export default Tutorial