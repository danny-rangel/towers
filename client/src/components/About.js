import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="ui container" id="aboutSection">
            <h4 id="aboutContent">
                Towers is a music application created for anyone who wants to 
                share their favorite songs with others
                <br></br>
                <br></br>
                Send me a message if you'd like an invitation
                <a className="ui inverted blue button" href="mailto:hello@danielrangel.io" style={{margin:'10px 0px 0px 10px'}}>
                    <i className="align center icon envelope outline icon" style={{margin:'0px'}}>
                    </i>
                </a>
            </h4>
        </div>
        
    );
}

export default About;