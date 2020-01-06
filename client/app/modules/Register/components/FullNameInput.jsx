import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fullName } from '~/modules/Register/actions';

class FullNameInput extends Component {
    constructor(props) {
        super(props);
    }

    onChangeHandler = (event) => {
        this.props.dispatch(fullName(event.target.value));
    };

    render() {
        return (
            <input
                type="text"
                name="fullName"
                value={this.props.value}
                onChange={this.onChangeHandler}
                maxLength="50"
                placeholder="Full Name"
            />
        );
    }
}

export default connect()(FullNameInput);