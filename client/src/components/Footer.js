import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div id="pageFooter" className="ui inverted vertical footer segment">
            <p id="footerContent">
                <i id="mobileaboutIcon" className="chess rook icon"></i> 
                    created by daniel rangel
                <i id="mobileaboutIcon" className="chess rook icon"></i> 
                <br></br>
                contact: hello@danielrangel.io
            </p>
            
        </div>
    );
}

export default Footer;