import React, { useRef, useEffect, useState } from 'react'
import hrly from "../../images/hrly.png"
import sy from "../../images/sy.png"




function MultiChain(){
    return (
         
        <div className="images">
            <div className="router-view">
                <div className="container landing-page">
                <div className="row mb-4 mt-2">
                  <div style={{marginTop:"100px"}} className='container col-12 col-xl-4 col-lg-4 col-md-4'>
                      <h1 style={{top: "0px", fontWeight: "750", maxWidth: "540px"}}>Multi-chain <span style={{color: "#ff4339"}}>SOLS</span><br/> launch</h1>
                      <div style={{marginTop:"0px"}} className='graytext'>Going one step further, Solisium will adopt a multi-chain planned expansion that will take SOLS to a new level with transfer capabilities between chains, value backing and compounding insurance that will make a safer and more pleasant experience for all investors. 
<br/><br/>We will announce the launch of our already in motion development for the Polygon Mainnet on Solisium Network homepage.</div>
                      <a style={{marginTop: "20px", padding:"15px 40px"}} className='btn btn-outline-light' href='#'>Under Development</a>
                  </div> 
                  <div className='hideimg container col-12 col-xl-4 col-lg-4 col-md-4'>
                      <img style={{width:"30rem", marginTop:"50px"}} src={hrly}/>
                  </div>
                </div>
                
               
                
              </div>
                







            </div>
            <div>
                <div>
                    
                </div>
            </div>
        </div>
        
    )
}

export default MultiChain