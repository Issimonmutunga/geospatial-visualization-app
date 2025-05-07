import React from "react";
import "./Footer.css";


const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-content">
                <span className="footer-brand">VPA</span>
                <span className="footer-text">{new Date().getFullYear()} Visualize Project Analyze.All rights reserved</span>
                <div className="footer-links">
                    <a href="/about">About</a>
                    <a href="/privacy">Privacy</a>
                    <a href="/contact">Contact</a>
                </div>
            </div>
        </footer>
    )
}
export default Footer;