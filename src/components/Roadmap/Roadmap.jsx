import React from 'react'
import ReactPlayer from 'react-player'
import roadmap from "../../images/roadmap.png"
import './Roadmap.css'
function Roadmap() {
  return (
    <div className="images">
        <div className="router-view">
            <div className="container landing-page">
                <div className="roadmap">
                    <div style={{marginTop:"0px"}} className="container col-12 col-xl-8 col-lg-4 col-md-4 text-center title flex roadmap-title-color">
                        
                        <h1 className='q4e2'>Multi-Chain</h1>
                        <div className='textbg'>SOLISIUM</div>
                            <img src={roadmap}/>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Roadmap