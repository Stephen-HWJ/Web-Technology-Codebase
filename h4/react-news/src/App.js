import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Shop from './components/shop';
import Error from "./components/error";
import MyNavbar from "./components/navbar";
import './App.css';

function App() {
  return (
    <main>
      <MyNavbar />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/shop' component={Shop} />
        <Route component={Error} />
      </Switch>
    </main>


  );
}

export default App;
