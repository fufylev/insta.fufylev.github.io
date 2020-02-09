import React, { Component } from 'react';
import './DashBoard.scss';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class DashBoard extends Component {

    componentDidMount() {
        const uid = localStorage.getItem('uid');
        
    }

    render() {

        return (
            <article className="container">
                {!localStorage.getItem('uid') && <Redirect to="/"/>}
                <h3>DashBoard to be developed soon</h3>
                <h3>However, you can explore the <Link to='/pictures/'>Gallery</Link></h3>
            </article>
        );
    }
}

export default connect()(DashBoard);