import React, {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";

import {Provider} from 'react-redux';
import store from './store';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';


import {Container} from 'reactstrap';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavbar></AppNavbar>
      <Container>
      <ItemModal></ItemModal>
      <ShoppingList></ShoppingList>
      </Container>
    </div>
    </Provider>
  );
}

export default App;
