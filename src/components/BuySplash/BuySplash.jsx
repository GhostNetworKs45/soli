import React from 'react'

import Particles from 'react-tsparticles';
import Chart from "../Facuet/Chart"



const BuySplash = () => {
  const particlesInit = (main) => {


    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {

  };
   return [
    <><Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          image: {
            value: "https://raw.githubusercontent.com/solisiumnetwork/assets/main/bg.png",
          },
        },
        fpsLimit: 30,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 20,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }} />
<div style={{    position: "absolute", top: "20%", width: "100%"}} className="row mb-4 mt-2">
                  <div style={{marginTop:"0px"}} className='container col-12 col-xl-4 col-lg-4 col-md-4'>
                    
                      
                      <h1 style={{color: "#ffffff"}}>Solisium <span style={{color: "#ff4339"}}>Governance</span><br/></h1>
<p className='headertext_new'>A deflationary daily ROI platform built first on the Polygon Mainnet with planned expansion to the Arbitrum and Fantom Mainnet, backed by a high yield, low risk contract, offering 3% daily, totaling 540% over 180 days.</p>

                  </div> 
                  <div className='container col-12 col-xl-4 col-lg-4 col-md-4'>
                      <img className='floating' src='https://raw.githubusercontent.com/solisiumnetwork/assets/main/polygon-matic-logo.png'/>
<img className='floating1' src='https://raw.githubusercontent.com/solisiumnetwork/assets/main/615d99c710c2e86d6ca6227b_arbitrum-logo.png'/>
<img className='floating2' src='https://raw.githubusercontent.com/solisiumnetwork/assets/main/fantom-ftm-logo.png'/>
                  </div>
                </div>

<div className="images">
            <div className="router-view homepg1">
                <div className="container landing-page">
                <div className="row mb-4 mt-2">
                  <div style={{marginTop:"100px"}} className='container col-12 col-xl-4 col-lg-4 col-md-4'>
                    
                      
                      <h1 style={{top: "0px", fontWeight: "750"}}>24 hour <span style={{color: "#ff4339"}}>RUSH!!!</span><br/></h1>
                      <div style={{marginTop:"0px"}} className='graytext'>24 hours without taxes on STAKE, COMPOUND or CLAIM (sell will still be taxed with 10%)! <span className='gradienttext'>This is our way to compensate our faithful members waiving the 10% tax, so come join us and start earning more!</span>.<br/><br/>RUSH will begin in:<br/><br/><img src="http://gen.sendtric.com/countdown/v2nykn2p0r"/></div>
                      <a style={{marginTop: "20px", padding:"15px 40px"}} className='btn btn-outline-light' href='https://solisium.network/static/media/whitepaper.62e43a9b.pdf'>Whitepaper</a>
                  </div> 
                  <div className=' container col-12 col-xl-4 col-lg-4 col-md-4'>
                    
                  </div>
                </div>
                
               
                
              </div>
                







            </div>
            <div className="router-view homepg2">
              <div className="row mb-4 mt-2">
                    <Chart/>
              </div>
            </div>
        </div>


</>

  ];
  
};



export default BuySplash;