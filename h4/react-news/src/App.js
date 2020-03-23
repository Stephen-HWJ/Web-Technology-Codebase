import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MyNavbar from "./components/navbar";
import SectionPage from "./components/section";
import ArticleContent from "./components/content";
import './App.css';

function App() {
  return (
    <main>
      <MyNavbar />
      <Switch>
        <Route path={"/article"} component={ArticleContent} exact/>
        <Route path='/section/:sec' component={SectionPage} exact />
        {/*<Route path='/shop' component={Shop} exact />*/}
        <Route component={SectionPage} exact />
      </Switch>
    </main>


  );
}

export default App;
