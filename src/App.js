import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import PokemonDetail from './components/Pokemon-Detail';
import PokemonOwnedDetail from './components/PokemonOwnedDetail';
import PokemonList from './components/Pokemon-List';
import PokemonMyList from './components/Pokemon-My-List';
import Loading from './components/Loading';

function App() {
  
  return (
    <div>
        <Router>
          <Header />
          <Switch>
            <Route path="/pokemon-detail/:id">
              <PokemonDetail />
            </Route>
            <Route path="/my-pokemon-detail/:name/:id">
              <PokemonOwnedDetail />
            </Route>
            <Route path="/pokemon-my-list">
              <PokemonMyList />
            </Route>
            <Route path="/">
              <PokemonList />
            </Route>
          </Switch>
        </Router>
        <Footer />
    </div>
  );
}

export default App;
