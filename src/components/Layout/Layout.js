import React from 'react';

import Wrapper from '../../hoc/Wrapper';

const layout = (props) => (
   <Wrapper>
    <div>
        HTML CONTENT
    </div>
    <main>
        {props.children}
    </main>
   </Wrapper>
);

export default layout;