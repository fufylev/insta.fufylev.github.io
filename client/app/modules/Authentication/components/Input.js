import React from 'react';

const Input = (props) => {
    const {onChange, value, name} = props;
    return (
        <input
            type={name}
            name={name}
            value={value}
            onChange={(event) => onChange(event)}
            placeholder={name[0].toUpperCase() + name.slice(1)}
            maxLength="50"
            required
        />
    );
};

export default Input;