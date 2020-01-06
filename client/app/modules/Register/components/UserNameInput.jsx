import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userName } from '~/modules/Register/actions';

class UserNameInput extends Component {
    constructor(props) {
        super(props);

    }

    onChangeHandler = (event) => {
        this.props.dispatch(userName(event.target.value))
    };

    render() {
        return (
            <input
                type="text"
                name="userName"
                value={this.props.value}
                onChange={this.onChangeHandler}
                maxLength="50"
                placeholder="Username"
                required
            />
        );
    }
}

export default connect()(UserNameInput);