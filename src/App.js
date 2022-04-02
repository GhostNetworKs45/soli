import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Swap from "./components/Swap/Swap";
import BuySplash from "./components/BuySplash/BuySplash";
import Facuet from "./components/Facuet/Facuet";
import Governance from "./components/Governance/Governance";
import MultiChain from "./components/MultiChain/MultiChain";
import SmartYield from "./components/SmartYield/SmartYield";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservoir from "./components/Reservoir/Reservoir";


function App() {


  let [oneTokenPrice, setOneTokenPrice]=useState(0);

  useEffect(() => {

    $(document).ready(function () {
    
  })
  }, [$]);
  return (
    <div >
      <ToastContainer />
      

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<BuySplash />} />
          <Route exact path="/ico" element={<BuySplash 
          setOneTokenPrice={setOneTokenPrice}
          />} />
          <Route exact path="/swap" element={<Swap 
          setOneTokenPrice={setOneTokenPrice}
          />} />
          <Route exact path="/stake" element={<Facuet
          oneTokenPrice={oneTokenPrice}
          />} />
          <Route exact path="/liquidity" element={<Reservoir />} />
          <Route exact path="/smart-yield" element={<SmartYield/>}  />
          <Route exact path="/governance" element={<Governance/>}  />
          <Route exact path="/multi-chain" element={<MultiChain/>}  />
          
        </Routes>
        <Footer />
      </BrowserRouter>
     
    </div>
  );
}

export default App;