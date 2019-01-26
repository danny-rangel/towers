import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { isMusicKitAuthorized, showSidebar } from '../actions';

class Header extends Component {

    async authorizeUser() {
        const res = await this.props.musicKit.authorize();
        this.props.isMusicKitAuthorized(res);
    }

    async unauthorizeUser() {
        const res = await this.props.musicKit.unauthorize();
        this.props.isMusicKitAuthorized(res);
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                        <div id="mobile" className="ui item">
                            <a id="logbutton" href="/auth/google" className="ui inverted white button">
                                <div id="buttonText">Log in With Google</div>
                            </a>
                        </div>
                );
            default:
                return (
                        <div id="mobile" className="ui item">   
                            <a id="logbutton" href="/api/logout" className="ui inverted white button">
                                <div id="buttonText">Sign Out of Towers</div>
                            </a>
                        </div>
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
                <div id="mobile" className="ui item">
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
                    <div style={{display: this.props.auth ? 'none' : 'block'}} id="mobile" className="ui item">
                        <a id="logbutton" href="/auth/google" className="ui inverted white button">
                            <div id="buttonText">Log in With Google</div>
                        </a>
                    </div>
                        {this.renderAvatar()}
                        {this.renderSidebar()}
                    </div>
            </div>

            <div id="mobileHeader" className="ui inverted fluid four item menu">
                <Link id="mobilehomebutton" to={this.props.auth ? '/home' : '/'} className="item">
                    <div><i id="mobilehomeIcon" className="home icon"></i></div>
                </Link>
                <Link id="mobileaboutbutton" to='/about' className="item">
                    <div><i id="mobileaboutIcon" className="chess rook icon"></i></div>
                </Link>
                <Link id="mobilesearchbutton" to='/search' className="item">
                    <div><i id="mobilesearchIcon" className="search icon"></i></div>
                </Link>
                <div id="mobileavatarbutton" className="item">
                    {this.renderMobileAvatar()}
                    {this.renderMobileSidebar()}
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = ({ auth, authorized, musicKit, sidebar }) => {
    return { auth, authorized, musicKit, sidebar };
}

export default connect(mapStateToProps, { isMusicKitAuthorized, showSidebar } )(Header);