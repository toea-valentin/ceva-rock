import React from 'react';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RealEstate from './RealEstate';
import MainPage from './MainPage/index.js'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' render={() => <MainPage />}></Route>
          <Route exact path='/real-estate' render={() => <RealEstate/>}></Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;