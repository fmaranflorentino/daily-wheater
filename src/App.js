import React from 'react';

import Wrapper from './hoc/Wrapper';
import Layout from './components/';

import Wheater from './containers/Wheater/Wheater';

function App() {
  return (
    <Wrapper>
      <Layout>
        <Wheater />
      </Layout>
    </Wrapper>
  );
}

export default App;
