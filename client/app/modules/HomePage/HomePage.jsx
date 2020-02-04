import './HomePage.scss';
import React, { Component } from 'react';
import { receiveUsersHandler } from '~/actions/users';
import { receivePicturesHandler } from '~/actions/pictures';
import { connect } from 'react-redux';

class HomePage extends Component {
    componentDidMount() {
        this.props.dispatch(receiveUsersHandler('users/'));
        this.props.dispatch(receivePicturesHandler('pictures/'));
    }

    render() {
        return (
            <div className="wrapper">
                PICTURES
            </div>
        );
    }
}

export default connect()(HomePage);