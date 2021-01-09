import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from 'Containers/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
