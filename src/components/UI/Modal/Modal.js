import React from 'react';

import Wrapper from '../../../hoc/Wrapper';
import Overlay from '../Overlay/Overlay';

import './Modal.css';

const modal = ( props ) => (
    <Wrapper>
        <Overlay show={props.show} clicked={props.modalClosed} />
        <div
            className='Modal'
        >
            {props.children}
        </div>
    </Wrapper>
);

export default modal;
