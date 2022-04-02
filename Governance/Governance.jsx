import React, { useRef, useEffect, useState } from 'react'
import g2 from "../../images/g2.png"
import g1 from "../../images/g1.png"




function Governance(){
    return (
         
        <div className="images">
            <div className="router-view">
                <div className="container landing-page">
                <div className="row mb-4 mt-2">
                  <div style={{marginTop:"100px"}} className='container col-12 col-xl-4 col-lg-4 col-md-4'>
                      <h1 style={{top: "0px", fontWeight: "750"}}>Solisium <span style={{color: "#ff4339"}}>Governance</span><br/></h1>
                      <div style={{marginTop:"0px"}} className='graytext'>Solisium DAO is an initiative, which grants voting rights to the <span className='gradienttext'>SLSM holders</span> and lays the foundation for the Solisium products. The Solisium DAO is the only source of minting new dApps or bring modifications to existing dApps on top of the blockchain and launching them into the ecosystem.<br/><br/>Solisium DAO empowers the community by enabling decentralized decision making on the Solisium protocol.</div>
                      <a style={{marginTop: "20px", padding:"15px 40px"}} className='btn btn-outline-light' href='#'>Under Development</a>
                  </div> 
                  <div className='hideimg container col-12 col-xl-4 col-lg-4 col-md-4'>
                      <img style={{width:"30rem", marginTop:"50px"}} src={g2}/>
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

export default Governance