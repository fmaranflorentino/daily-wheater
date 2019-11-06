import React from 'react';

import Aux from '../../hoc/Wrapper';

const layout = (props) => (
   <Aux>
    <div>
        HTML CONTENT
    </div>
    <main>
        {props.children}
    </main>
   </Aux>
);

export default layout;