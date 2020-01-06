import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mobileOrEmail } from '~/modules/Register/actions';

class MobileEmailInput extends Component {
    constructor(props) {
        super(props);
    }

    onChangeHandler = (event) => {
        this.props.dispatch(mobileOrEmail(event.target.value))
    };

    render() {
        return (
            <input
                type="text"
                name="mobileOrEmail"
                value={this.props.value}
                onChange={this.onChangeHandler}
                placeholder="Mobile Number or Email"
                required
                maxLength="50"
            />
        );
    }
}

export default connect()(MobileEmailInput);