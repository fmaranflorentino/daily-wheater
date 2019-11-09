import React from 'react';

import Wrapper from './../../hoc/Wrapper';
import Header from './../UI/Header/';

import './Layout.css';

const layout = (props) => (
   <Wrapper>
    <Header></Header>
    <main class="app-container">
        {props.children}
    </main>
   </Wrapper>
);

export default layout;