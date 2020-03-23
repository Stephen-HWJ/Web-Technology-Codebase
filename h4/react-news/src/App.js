import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MyNavbar from "./components/navbar";
import SectionPage from "./components/section";
import './App.css';

function App() {
  return (
    <main>
      <MyNavbar />
      <Switch>
        {/*<Route path={"/"} component={SectionPage} exact />*/}
        <Route path='/section/:sec' component={SectionPage} exact />
        {/*<Route path='/shop' component={Shop} exact />*/}
        <Route component={SectionPage} exact />
      </Switch>
    </main>


  );
}

export default App;
