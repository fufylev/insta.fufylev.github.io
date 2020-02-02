import './index.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const SingUpLogIn = (props) => {
    const {text, path, action} = props.data;
    return (
        <div className="sign_in">
            <p className="">{text} &nbsp;
                <Link to={path} className="">{action}</Link>
            </p>
        </div>
    );
};

export default SingUpLogIn;