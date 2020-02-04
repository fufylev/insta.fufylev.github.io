import './Header.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearReducerHandler } from '~/actions/authentication';
import { fire } from '~/libs/api/API';
import { FaInstagram } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import instagramLogo from '~/assets/img/insta.svg';

class Header extends Component {
    logOut = () => {
        fire.auth().signOut()
            .then(() => {
                localStorage.removeItem('uid');
                this.props.dispatch(clearReducerHandler());
            });

    };

    render() {
        return (
            <div className="header">
                <div className="wrapper ">
                    <div className="header-container">
                        <div className="icons-container">
                            <Link to="/" className="">
                                <FaInstagram size="2em" className="logo"/>
                            </Link>
                            <Link to="/" className="logo-word">
                                <img src={instagramLogo} alt="logo" className="instagram-logo"/>
                            </Link>
                        </div>
                        <div className="icons-container">
                            <MdSearch size="1.7em" className="icons"/>
                            <FaRegHeart size="1.5em" className="icons"/>
                            <Link to="/user" className="">
                                <FaRegUser size="1.5em" className="icons"/>
                            </Link>
                            <FaSignOutAlt size="1.5em" className="icons" onClick={this.logOut}/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.authentication };
}

export default connect(mapStateToProps)(Header);