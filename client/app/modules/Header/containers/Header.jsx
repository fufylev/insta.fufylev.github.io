import './Header.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import headerReducer from '~/modules/Header/reducer';

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

function mapStateToProps(state) {
    return state.headerReducer;
}

export default connect(mapStateToProps)(Header);