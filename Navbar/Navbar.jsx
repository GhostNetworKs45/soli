import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import logo from "../../images/logo4.png";
import { useMoralis } from "react-moralis"


const Navbarapp = () => {
  const {account, authenticate,} = useMoralis();

  const { t, i18n } = useTranslation();


  function handleClick(lang) {
    console.log("lang", lang);
    i18n.changeLanguage(lang);
  }

const connectWallet = async()=>{
  try{
authenticate({chainId: 137, signingMessage: "Welcome to Solisium Network"})

  }catch(error){
    console.log("while connecting",error )
  }
}


  return (
     <div className="fluid-container navbarmain">
      <div className="container">
        <Navbar collapseOnSelect expand="lg" className="" variant="dark">
          {/* <Container> */}
            <Link to="/">
              <Navbar.Brand
                href=""
                style={{ color: "white" }}
                className="navbarlogo"
              >
                <img src={logo} width="220px"/>
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto ">
                
                <Link to="/swap" style={{ textDecoration: "none" }}>
                  {" "}
                  <Nav.Link href="#swap" className="ml-md-2 mx-1" id="navbartext">
                  Swap
                  </Nav.Link>
                </Link>

                <Link to="/stake" style={{ textDecoration: "none" }}>
                  <Nav.Link href="#stake" className=" mx-1" id="navbartext">
                  Stake
                  </Nav.Link>
                </Link>
               
                
                <Link to="/governance" style={{ textDecoration: "none" }}>
                  <Nav.Link href="#governance" className=" mx-1" id="navbartext">
                  Governance
                  </Nav.Link>
                </Link>
                <Link to="/multi-chain" style={{ textDecoration: "none" }}>
                  <Nav.Link href="#multi-chain" className=" mx-1" id="navbartext">
                  Multi-Chain
                  </Nav.Link>
                </Link>
                
              </Nav>
              <Nav className="me-3">
                
                {/* <MdLanguage/> */}
                
                <Dropdown>
  <Dropdown.Toggle align="end" variant="light1" id="dropdown-menu-align-end">
    Polygon Mainnet
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#">Fantom Mainnet (SOON)</Dropdown.Item>
    <Dropdown.Item href="#">Arbitrum Mainnet (SOON)</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
                
                <div className="mx-2 connbtn">
                  <button className="btn btn-light" onClick={connectWallet} >
                    <g data-v-de8c4aa0>
                      <path d="M6 0a.5.5 0 0 1 .5.5V3h3V.5a.5.5 0 0 1 1 0V3h1a.5.5 0 0 1 .5.5v3A3.5 3.5 0 0 1 8.5 10c-.002.434-.01.845-.04 1.22-.041.514-.126 1.003-.317 1.424a2.083 2.083 0 0 1-.97 1.028C6.725 13.9 6.169 14 5.5 14c-.998 0-1.61.33-1.974.718A1.922 1.922 0 0 0 3 16H2c0-.616.232-1.367.797-1.968C3.374 13.42 4.261 13 5.5 13c.581 0 .962-.088 1.218-.219.241-.123.4-.3.514-.55.121-.266.193-.621.23-1.09.027-.34.035-.718.037-1.141A3.5 3.5 0 0 1 4 6.5v-3a.5.5 0 0 1 .5-.5h1V.5A.5.5 0 0 1 6 0zM5 4v2.5A2.5 2.5 0 0 0 7.5 9h1A2.5 2.5 0 0 0 11 6.5V4H5z"></path>
                    </g>
                    {/* Connect Wallet */}
                    {account ? account.substring(0, 6) + "..." + account.substring(account.length - 6): "Connect Wallet"}
                  </button>
                </div>
              </Nav>
            </Navbar.Collapse>
          
        </Navbar>
        
        
      </div>
    </div>
  );
};

export default Navbarapp;
