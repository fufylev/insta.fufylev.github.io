import './Header.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuthStoreHandler } from '~/actions/authentication';
import { clearUsersStoreHandler } from '~/actions/users';
import { fire } from '~/libs/api/API';
import { FaInstagram, FaRegHeart, FaRegUser, FaSignOutAlt } from 'react-icons/fa';
import { TiCompass } from 'react-icons/ti';
import instagramLogo from '~/assets/img/insta.svg';
import SearchLine from '~/modules/Header/components/SearchLine/SearchLine.jsx';

const Header = (props) => {

    function logOut() {
        fire.auth().signOut()
            .then(() => {
                localStorage.removeItem('uid');
                props.dispatch(clearAuthStoreHandler());
                props.dispatch(clearUsersStoreHandler());
            });
    }

    return (
        <div className="header">
            <div className="container header-container">
                <div className="icons-container">
                    <Link to="/" className="">
                        <FaInstagram size="3rem" className="logo"/>
                    </Link>
                    <Link to="/" className="logo-word">
                        <img src={instagramLogo} alt="logo" className="instagram-logo"/>
                    </Link>
                </div>
                <SearchLine/>
                <div className="icons-container">
                    <Link to="/pictures" className="">
                        <TiCompass size="2em" className="icons"/>
                    </Link>
                    <FaRegHeart size="1.5em" className="icons"/>
                    <Link to="/user" className="">
                        <FaRegUser size="1.5em" className="icons"/>
                    </Link>
                    <FaSignOutAlt size="1.5em" className="icons" onClick={logOut}/>
                </div>

            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return { ...state.authentication };
}

export default connect(mapStateToProps)(Header);