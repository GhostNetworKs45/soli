import React from "react";
import "./footer.css";
import { IoIosArrowDropup } from "react-icons/io";
import l from "../../images/logo4.png";
import ipfs from "../../images/ipfs.png";
import { useTranslation } from "react-i18next";
import { FaTelegramPlane,FaTwitter  } from 'react-icons/fa';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div id="footer" className="section footer mb-0">
        <div className="container">
          <div className="row footer-row">
            <div className="col-11 text-right">
              <a
                id="footerCircleButton"
                className="btn btn-circle btn-outline-semi-light footer-circle-button"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <IoIosArrowDropup size={40} style={{ color: "#7c625a" }} />
              </a>
            </div>
            <div className="col-12 text-center footer-content">
              <img alt="footer logo" src={l} className="footer-logo" />
              <p style={{fontSize: "12px", color: "#bebbbb", marginTop:"20px"}}>Please do your own research before using this application. Ultimately you are interacting with no other party other than the blockchain itself and are 100% responsible for your transactions. Please do your own research before interacting with any contract or asset on the blockchain. </p>

<p style={{fontSize: "12px", color: "#bebbbb"}}>The Solisium Network community is a decentralized autonomous organization and is never liable for losses that happen using this user interface or the Solisium Network protocol.</p>
            <img style={{width:"300px"}} src={ipfs}/>
</div>
          </div>
          <div id="footerMenuAccordion" className="row"></div>
        </div>
        <div className="container copyright pt-5 pb-5">
          <div className="row justify-content-between">
            <div className="col-sm-12 col-md-6 mb-2" style={{color: "#ffffff", fontSize: "14px"}}>
              2022 © SOLISIUM NETWORK
            </div>
            <div className="social-icons col-sm-12 col-md-6 text-center d-flex justify-content-evenly">
              <p >
                <a
                style={{color: "#ffffff", fontSize: "14px"}}
                  target="_blank"
                  href="https://t.me/solisium_network"
                  className="footer-link"
                >
                  <FaTelegramPlane size={14}/>
                  {/* <img src="/images/telegram.png" className="footer-telegram" /> */}
                  {t("JoinusonTelegram.1")}
                </a>
              </p>
              <p>
                <a
                style={{color: "#ffffff", fontSize: "14px"}}
                  target="_blank"
                  href="https://twitter.com/SolisiumN"
                  className="footer-link"
                >
                  
                  <FaTwitter size={14}/>
                  {/* <img src="/images/twitter.png" className="footer-telegram" /> */}
                  {t("JoinusTwiter.1")}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
