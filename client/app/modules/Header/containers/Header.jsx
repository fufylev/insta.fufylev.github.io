import './Header.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearReducerHandler } from '~/modules/Authentication/actions';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    logOut = () => {
        localStorage.removeItem('uid');
        this.props.dispatch(clearReducerHandler())
    };

    render() {
        return (
            <div className="header">
                <button onClick={this.logOut}>
                    Log Out
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.authentication };
}

export default connect(mapStateToProps)(Header);