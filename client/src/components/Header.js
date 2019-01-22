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
                            <a href="/auth/google" className="ui inverted white button">
                                Login With Google
                            </a>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="right menu">
                        <div className="ui item">
                            <a href="/api/logout" className="ui inverted white button">
                                Sign Out
                            </a>
                        </div>
                    </div>
                );
        }
    }



    render() {
        return (
            <div id="mainHeader" className="ui inverted menu">
                <div className="ui container">
                    <Link to={this.props.auth ? '/home' : '/'} className="item">
                        Towers
                    </Link>
                    <Link to='/about' className="item">
                        About
                    </Link>
                    <Link to='/search' className="item">
                        Search
                    </Link>
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);