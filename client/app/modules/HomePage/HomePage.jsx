import './HomePage.scss';
import React, { Component } from 'react';
import { fire, database } from '~/libs/api/API';

class HomePage extends Component {
    componentDidMount() {
        const user = fire.auth().currentUser;
        // console.log(user);
    }
    render() {
        const user = fire.auth().currentUser;
        return (
            <div className="wrapper">
                PICTURES
            </div>
        );
    }
}

export default HomePage;