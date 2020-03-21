import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Shop from './components/shop';
import Error from "./components/error";
import MyNavbar from "./components/navbar";
import SectionPage from "./components/section";
import './App.css';

function App() {
  return (
    <main>
      <MyNavbar />
      <Switch>
        <Route path='/' component={SectionPage} exact />
        <Route path='/shop' component={Shop} />
        <Route component={Error} />
      </Switch>
    </main>


  );
}

export default App;
