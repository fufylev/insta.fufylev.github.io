import React from 'react';
import { Link } from 'react-router-dom';

export default function SingIn() {
    return (
        <div className="sign_in">
            <p className="">Have an account? &nbsp;
                <Link to="/auth" className="">Log in</Link>
            </p>
        </div>
    );
};