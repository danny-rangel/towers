import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <div className="right menu">
                        <div className="ui item">
                            <a id="logbutton" href="/auth/google" className="ui inverted white button">
                                <h2 id="buttonText">Log in With Google</h2>
                            </a>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="right menu">
                        <div className="ui item">
                            <a id="logbutton" href="/api/logout" className="ui inverted white button">
                            <div id="buttonText">Sign Out</div>
                            </a>
                        </div>
                    </div>
                );
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
                    {this.renderContent()}
               
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);