import React from 'react';


const About = () => {

    return (
        <div className="ui container" style={{margin: '0 100px', textAlign: 'left'}}>
            <h1 style={{color: 'white', margin: '100px auto 0'}}>
                Towers is a social media music application for those who love sharing their favorite songs with others.
            </h1>
            <br></br>
            <br></br>
            <h4 style={{color: 'white', margin: 'auto'}}>
                This app is powered by Apple and therefore can stop working at any moment! However, that is not likely to happen
                so don't fret! We would love to hear from you so please direct any feedback to 
                <a href="mailto:contact@towersmusic.io" style={{color: 'white', textDecoration: 'underline', fontSize: '1.5rem'}}> contact@towersmusic.io</a>
            </h4>
        </div>
    );
}

export default About;