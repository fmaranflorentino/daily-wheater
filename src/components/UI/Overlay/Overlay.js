import React from 'react';

import './Overlay.css';

const backdrop = (props) => (
    props.show ? <div className='Overlay' onClick={props.clicked}></div> : null
);

export default backdrop;