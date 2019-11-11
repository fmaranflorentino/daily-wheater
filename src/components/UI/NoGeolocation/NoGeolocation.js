import React from 'react';

import Button from './../Button/';

import Storm from './../../../assets/icons/storm.svg';
import './NoGeolocation.css';

const NoGeolocation = (props) => {
    const classes = [
        'no-content',
        props.initialAnimation ? 'activeNoContent' : '',
        props.finishAnimation ? 'finish' : 'leaveActiveContent'
    ];
    return (
        <section>
            <div className={classes.join(' ')}>
                <img width='70' src={Storm} alt='Ícone de tempestade' />
                <p><span>{props.span}</span> {props.message}</p>
                <Button
                    click={props.click}
                    text={props.btnText}
                    icon={props.btnIcon}
                />
            </div>
        </section>
    );
}

export default NoGeolocation;