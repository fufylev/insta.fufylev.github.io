import React, { Component } from 'react';
import './User.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class User extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <div className="wrapper">
                {isLoggedIn !== true && <Redirect to="/"/>}
                User to be developed
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.authentication };
}

export default connect(mapStateToProps)(User);