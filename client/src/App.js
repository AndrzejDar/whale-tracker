import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";

import { Container } from "reactstrap";
import Wallet from "./components/Wallet";
import WalletSearch from "./components/WalletSearch";

class App extends Component {
  componentDidMount(){
    //user loading disabled
    //store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar></AppNavbar>
          <Container>
            {/* <ItemModal></ItemModal>
            <ShoppingList></ShoppingList> */}
            <WalletSearch/>
            <Wallet></Wallet>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
