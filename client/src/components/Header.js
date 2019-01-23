import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { isMusicKitAuthorized } from '../actions';

class Header extends Component {


    async authorizeUser() {
        const res = await this.props.musicKit.authorize();
        this.props.isMusicKitAuthorized(res);
    }

    async unauthorizeUser() {
        const res = await this.props.musicKit.unauthorize();
        this.props.isMusicKitAuthorized(res);
    }


    //TODO CREATE SEPERATE MENU WITH SUI SIDEBAR

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                        <div className="ui item">
                            <a id="logbutton" href="/auth/google" className="ui inverted white button">
                                <div id="buttonText">Log in With Google</div>
                            </a>
                        </div>
                );
            default:
                return (
                        <div className="ui item">
                            <a id="logbutton" href="/api/logout" className="ui inverted white button">
                                <div id="buttonText">Sign Out of Towers</div>
                            </a>
                        </div>
                );
        }
    }

    renderAppleAuth() {
        switch (this.props.authorized) {
            case false:
                return (
                        <div className="ui item">
                            <button onClick={() => this.authorizeUser()} id="appleButton"  className="ui inverted white button">
                                <div id="buttonText">Listen with Apple Music
                                    <img alt="applemusicicon" id="appleMusicIcon" src="Apple_Music_Icon.png"></img>
                                </div>
                            </button>
                        </div>
                );
            default:
            case true:
            return (
                <div className="ui item">
                    <button onClick={() => this.unauthorizeUser()} id="appleButton"  className="ui inverted white button">
                        <div id="buttonText">Sign Out of Apple Music
                            <img alt="applemusicicon" id="appleMusicIcon" src="Apple_Music_Icon.png"></img>
                        </div>
                    </button>
                </div>
                );
            case null:
                return;
        }
    }



    render() {
        return (
            <div id="mainHeader" className="ui inverted stackable menu">

                    <Link to={this.props.auth ? '/home' : '/'} className="item">
                        <div id="homebutton"><h2 id="buttonText">Towers</h2></div>
                    </Link>
                    <Link to='/about' className="item">
                        <div id="aboutbutton"><h4 id="buttonText">About</h4></div>
                    </Link>
                    <Link to='/search' className="item">
                        <div id="searchbutton"><h4 id="buttonText">Search</h4></div>
                    </Link>
                    <div className="right menu">
                        {this.renderAppleAuth()}
                        {this.renderContent()}
                    </div>
                    
            </div>
        );
    }
}

const mapStateToProps = ({auth, authorized, musicKit }) => {
    return { auth, authorized, musicKit };
}

export default connect(mapStateToProps, { isMusicKitAuthorized } )(Header);