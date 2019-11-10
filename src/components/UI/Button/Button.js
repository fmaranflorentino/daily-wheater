import React from 'react';

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

export default Button