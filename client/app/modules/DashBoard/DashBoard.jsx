import React, { Component } from 'react';
import './DashBoard.scss';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { checkIfUserMetadataExists, getUser, db } from '~/libs/api/API';
import { saveUserToStateHandler, setUserToDataBaseHandler } from '~/actions/users';

class DashBoard extends Component {

    componentDidMount() {

        getUser().then(uid => {
            checkIfUserMetadataExists(uid)
                .then(({ ifExists, metadata }) => {
                    if (!ifExists) {
                        this.props.dispatch(setUserToDataBaseHandler());
                    } else {
                        this.props.dispatch(saveUserToStateHandler(metadata));
                    }
                });
        });
    }

    render() {
        const { currentUser } = this.props.users;
        const { isLoggedIn } = this.props.authentication;
        return (
            <article className="container">
                {!localStorage.getItem('uid') && isLoggedIn !== true && <Redirect to="/"/>}
                {currentUser && <h3>Hello: {currentUser.username}</h3>}
                <h3>DashBoard is being developed</h3>
                <h3>However, you can explore the <Link to='/pictures/'>Gallery</Link></h3>

            </article>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        authentication: state.authentication,
    };
}

export default connect(mapStateToProps)(DashBoard);