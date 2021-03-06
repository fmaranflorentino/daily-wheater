import React from 'react';
import PropTypes from 'prop-types';


import Wrapper from './../../../hoc/Wrapper';

import './Error.css';
import error from './../../../assets/icons/error.svg';

const Error = (props) => {
    return (
        <Wrapper>
            <article className='Error tada'>
                <img width='50' src={error} alt="Error icon" />
                <p>{props.message}</p>
            </article>
        </Wrapper>
    );
}

Error.propTypes = {
    message: PropTypes.string.isRequired
};

export default Error;