import React from 'react';

import Wrapper from './../../hoc/Wrapper';
import Header from './../UI/Header/';

import './Layout.css';

const Layout = (props) => (
   <Wrapper>
    <Header></Header>
    <main className="app-container">
        {props.children}
    </main>
   </Wrapper>
);

export default Layout;