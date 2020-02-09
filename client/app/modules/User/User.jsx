import React, { Component } from 'react';
import './User.scss';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class User extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <div className="container">
                {isLoggedIn !== true && <Redirect to="/"/>}
                <h3>User page to be developed soon</h3>
                <h3>However, you can explore the <Link to='/pictures/'>Gallery</Link></h3>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.authentication };
}

export default connect(mapStateToProps)(User);