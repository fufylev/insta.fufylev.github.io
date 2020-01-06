import React, { Component } from 'react';
import { connect } from 'react-redux';

import { password } from '~/modules/Register/actions';

class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordInputType: 'password', //to change password visibility
        };
    }

    onChangeHandler = (event) => {
        this.props.dispatch(password(event.target.value));
    };

    render() {
        return (
            <input
                type={this.state.passwordInputType}
                name="password"
                value={this.props.value}
                onChange={this.onChangeHandler}
                maxLength="50"
                placeholder="Password"
                required
            />
        );
    }
}

export default connect()(PasswordInput);