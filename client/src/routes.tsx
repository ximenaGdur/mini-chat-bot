import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
// Import other page components as needed

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* Add more routes here */}
      </Switch>
    </Router>
  );
};

export default AppRoutes;
