import React from 'react';

import Wrapper from './hoc/Wrapper';
import Layout from './components/Layout/Layout';

import WheaterStatus from './containers/WheaterStatus/WheaterStatus';

function App() {
  return (
    <Wrapper>
      <Layout>
        <WheaterStatus />
      </Layout>
    </Wrapper>
  );
}

export default App;
