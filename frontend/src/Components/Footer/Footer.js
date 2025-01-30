import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <h3 className="footer_title">
                                              
                  <p className="footer_text">ResQue was developed and designed 
                   in 2025 with the collaboration
                  of a team of four members.</p>
                </h3>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <h3 className="footer_title">
                  Quick Links
                </h3>
                <ul>
                  <li><a href="/">LiveAlertMap</a></li>
                  <li><a href="/chatbot">WildfireDetection</a></li>
                  
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <h3 className="footer_title">
                  Contact
                </h3>
                
                <p className="footer_text">+91 4444444 <br />
                  ResQue@gmail.com</p>
                <a href="#" className="line-button">Get Direction</a>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <h3 className="footer_title">
                  Newsletter
                </h3>
                <form action="#" className="newsletter_form">
                  <input type="text" placeholder="Enter your mail" />
                  <button type="submit">Sign Up</button>
                </form>
                <p className="newsletter_text">Subscribe newsletter to get updates</p>
                <div className="socail_links">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook-square fa-2x" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter fa-2x" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram fa-2x" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-right_text">
        <div className="container">
          <div className="footer_border" />
          <div className="row">
            <div className="col-12">
              <p className="copy_right">
                Copyright © All rights reserved 2025| ResQue
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
