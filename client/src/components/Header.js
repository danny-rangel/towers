import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { isMusicKitAuthorized, showSidebar, haveNewNotifications } from '../actions';
import socket from '../utils/socketClient';

class Header extends Component {

    async authorizeUser() {
        const res = await this.props.musicKit.authorize();
        this.props.isMusicKitAuthorized(res);
    }

    async unauthorizeUser() {
        const res = await this.props.musicKit.unauthorize();
        this.props.isMusicKitAuthorized(res);
    }

    componentDidMount() {
        // FIX: ONLY CALL ACTION CREATOR IF AUTH EXISTS
        this.props.haveNewNotifications();
        socket.on('notification', (data) => {
            this.props.haveNewNotifications();
        })
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <>
                        <div id="mobile" className="ui item">
                            <a id="logbutton" href="/auth/google">
                                <h3 id="buttonText">Log in With Google</h3>
                            </a>
                        </div>
                        <div id="mobile" className="ui item">   
                            <Link to="/about">
                                <h3 id="buttonText">About</h3>
                            </Link>
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <div id="mobile" className="ui item">   
                            <a id="logbutton" href="/api/logout">
                                <h3 id="buttonText">Sign Out of Towers</h3>
                            </a>
                        </div>
                        <div id="mobile" className="ui item">   
                            <Link to="/about">
                                <h3 id="buttonText">About</h3>
                            </Link>
                        </div>
                    </>        
                        
                );
        }
    }


    renderAvatar() {
        if (!this.props.auth) {
            return;
        } else if (this.props.auth && this.props.sidebar === false) {
            return (
                <div onClick={() => this.props.showSidebar(true)} className="ui item">
                    <div id="profileInfo">
                        <img id="profileAvatar" alt={this.props.auth.username} className="ui avatar image" src={this.props.auth.profileImage}></img>
                        <h4 id="headerUsername" className="header">{this.props.auth.username}</h4>
                    </div>
                </div>
            );
        } else if (this.props.auth && this.props.sidebar === true) {
            return (
                <div className="ui item">
                    <div id="profileInfo">
                        <Link onClick={() => this.props.showSidebar(false)} to={`/${this.props.auth.username}`}><img id="profileAvatar" alt={this.props.auth.username} className="ui avatar image" src={this.props.auth.profileImage}></img></Link>
                        <Link onClick={() => this.props.showSidebar(false)} to={`/${this.props.auth.username}`}><h4 id="headerUsername" className="header">{this.props.auth.username}</h4></Link>
                    </div>
                </div>
            );
        }
    }

    renderMobileAvatar() {
        if (!this.props.auth) {
            return;
        } else if (this.props.auth && this.props.sidebar === false) {
            return (
                <div onClick={() => this.props.showSidebar(true)} className="ui item">
                    <div id="profileInfo">
                        <img id="profileAvatar" alt={this.props.auth.username} className="ui avatar image" src={this.props.auth.profileImage}></img>
                        {/* <h4 id="headerUsername" className="header">{this.props.auth.username}</h4> */}
                    </div>
                </div>
            );
        } else if (this.props.auth && this.props.sidebar === true) {
            return (
                <div id="mobile" className="ui item">
                    <div id="profileInfo">
                        <Link onClick={() => this.props.showSidebar(false)} to={`/${this.props.auth.username}`}><img id="profileAvatar" alt={this.props.auth.username} className="ui avatar image" src={this.props.auth.profileImage}></img></Link>
                        {/* <Link onClick={() => this.props.showSidebar(false)} to={`/${this.props.auth.username}`}><h4 id="headerUsername" className="header">{this.props.auth.username}</h4></Link> */}
                    </div>
                </div>
            );
        }
    }

    renderAppleAuth() {
        switch (this.props.authorized) {
            case false:
                return (
                        <div id="mobile" className="ui item">
                            <div onClick={() => this.authorizeUser()} id="appleButton">
                                <h3 id="buttonText">Listen with Apple Music
                                    {/* <img alt="applemusicicon" id="appleMusicIcon" src="Apple_Music_Icon.png"></img> */}
                                </h3>
                            </div>
                        </div>
                );
            default:
            case true:
            return (
                <div id="mobile" className="ui item">
                    <div onClick={() => this.unauthorizeUser()} id="appleButton">
                        <h3 id="buttonText">Sign Out of Apple Music
                            {/* <img alt="applemusicicon" id="appleMusicIcon" src="Apple_Music_Icon.png"></img> */}
                        </h3>
                    </div>
                </div>
                );
            case null:
                return;
        }
    }



    renderSidebar() {
        switch(this.props.sidebar) {
            case true:
                return (
                        <div className="ui right vertical inverted visible sidebar menu">
                            <button id="closeButton" className="item">
                                <i onClick={() => this.props.showSidebar(false)} id="closeIcon" className="x icon"></i>
                            </button>
                            {this.renderAvatar()}
                            {this.renderAppleAuth()}
                            {this.renderContent()}
                        </div>
                );
            default:
                return;
        }
    }


    renderMobileSidebar() {
        switch(this.props.sidebar) {
            case true:
                return (
                        <div  className="ui right vertical inverted visible sidebar menu">
                            <button id="closeButton" className="item">
                                <i onClick={() => this.props.showSidebar(false)} id="closeIcon" className="x icon"></i>
                            </button>
                                {this.renderMobileAvatar()}
                                {this.renderAppleAuth()}
                                {this.renderContent()}                            
                        </div>
                );
            default:
                return;
        }
    }





    render() {
        return (
        <div>
            <div id="mainHeader" className="ui fixed sticky borderless inverted stackable menu">
                <div className="ui container">
                    <Link style={{ display: this.props.auth ? 'flex' : 'none' }} to={this.props.auth ? '/home' : '/'} className="item">
                        <div id="homebutton"><i className="chess rook icon"></i></div>
                    </Link>
                    <Link style={{ display: this.props.auth ? 'flex' : 'none' }} to='/search/songs' className="item">
                        <div id="searchbutton"><i className="search icon"></i></div>
                    </Link>
                    <Link style={{ display: this.props.auth ? 'flex' : 'none' }} to='/notifications' className="item">
                        <div id="notificationbutton">
                            <i className="bell icon"></i>
                            <div 
                                style={{
                                    backgroundColor: 'white', 
                                    borderRadius: '50%', 
                                    height: '8px', 
                                    width: '8px', 
                                    display: this.props.newNotifications ? 'inline-block' : 'none', 
                                    position: 'absolute', 
                                    top: '25px', 
                                    right: '36px',
                                    boxShadow: '0px 0px 2px #ffffff'
                                    }}>
                            </div>
                        </div>
                    </Link>
                    <div className="right menu">
                    <div style={{display: this.props.auth ? 'none' : 'flex'}} id="mobile" className="ui item">
                        <a id="logbutton" href="/auth/google" className="ui inverted white button">
                            <div id="buttonText">LOG IN</div>
                        </a>
                    </div>
                        {this.renderAvatar()}
                        {this.renderSidebar()}
                    </div>
                </div>
            </div>



            <div id="mobileHeader" className={this.props.auth ? "ui fixed sticky borderless inverted fluid four item menu" : "ui fixed sticky borderless inverted fluid two item menu"}>
                <Link style={{ display: this.props.auth ? 'flex' : 'none' }} id="mobilehomebutton" to={this.props.auth ? '/home' : '/'} className="item">
                    <div id="buttonText"><i id="mobilehomeIcon" className="chess rook icon"></i></div>
                </Link>
                <Link style={{ display: this.props.auth ? 'flex' : 'none' }} id="mobilesearchbutton" to='/search/songs' className="item">
                    <div id="buttonText">
                        <i id="mobilesearchIcon" className="search icon"></i>
                    </div>
                </Link>
                <Link style={{ display: this.props.auth ? 'flex' : 'none' }} id="mobileaboutbutton" to='/notifications' className="item">
                    <div id="buttonText">
                        <i 
                            id="mobileaboutIcon" 
                            className="bell icon"
                        >
                        </i>
                        <div 
                            style={{
                                backgroundColor: 'white', 
                                borderRadius: '50%', 
                                height: '8px', 
                                width: '8px', 
                                display: this.props.newNotifications ? 'inline-block' : 'none', 
                                position: 'absolute', 
                                top: '30%', 
                                right: '36%',
                                boxShadow: '0px 0px 2px #ffffff'
                                }}>
                        </div>
                    </div>
                </Link>
                <div id="mobileavatarbutton" className="item">
                <div style={{display: this.props.auth ? 'none' : 'flex'}} id="mobile" className="ui item">
                        <a style={{ float: 'right'}} id="logbutton" href="/auth/google" >
                            <div id="buttonText"><h3>LOG IN</h3></div>
                        </a>
                    </div>
                    {this.renderMobileAvatar()}
                    {this.renderMobileSidebar()}
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = ({ auth, authorized, musicKit, sidebar, newNotifications }) => {
    return { auth, authorized, musicKit, sidebar, newNotifications };
}

export default connect(mapStateToProps, { isMusicKitAuthorized, showSidebar, haveNewNotifications } )(Header);