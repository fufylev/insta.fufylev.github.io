import './Header.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    };

    render() {

        return (
            <div className="header">
                HEADER
            </div>
        );
    }
}

export default connect()(Header);