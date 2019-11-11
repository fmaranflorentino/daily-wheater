import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = (props) => {
    const classes = [
        'Button',
        props.type === 'small' ? 'sm' : '',
    ];

    return (
        <button
            onClick={props.click}
            className={classes.join(' ')}
        >
            {props.icon ? <img width='20' src={props.icon} alt={props.text} /> : null}
            <span>{props.text}</span>
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}

export default Button;