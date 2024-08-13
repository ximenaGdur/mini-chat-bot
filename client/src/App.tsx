import React from 'react';
import AppRoutes from './routes';
import Layout from './components/Layout/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
