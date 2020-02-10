import React, { Component } from 'react';
import './User.scss';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class User extends Component {
    render() {
        const { currentUser } = this.props.users;
        const { isLoggedIn } = this.props.authentication;
        return (
            <div className="container">
                {!localStorage.getItem('uid') && isLoggedIn !== true && <Redirect to="/" />}
                <h3>User page to be developed soon</h3>
                <h3>However, you can explore the <Link to='/pictures/'>Gallery</Link></h3>
                {currentUser && <h4>Hello: {currentUser.email}</h4>}
                <p>Here will be all your uploads</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        authentication: state.authentication
    };
}

export default connect(mapStateToProps)(User);