import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MyNavbar from "./components/navbar";
import SectionPage from "./components/section";
import ArticleContent from "./components/content";
import SearchPage from "./components/searchPage";
import './App.css';
import FavouritePage from "./components/favourite";

function App() {
  return (
    <main>
        {/*<h1>Test</h1>*/}
      <MyNavbar />
      <Switch>
        <Route path={"/article"} component={ArticleContent} exact/>
        <Route path={"/search"} component={SearchPage} exact/>
        <Route path={"/favourite"} component={FavouritePage} exact/>
        <Route path='/section/:sec' component={SectionPage} exact />
        <Route component={SectionPage} exact />
      </Switch>
    </main>
  );
}

export default App;
