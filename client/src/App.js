import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar";
import ItemModal from "./components/ItemModal";

import { Container } from "reactstrap";
import Wallet from "./components/Wallet";
import WalletSearch from "./components/WalletSearch";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./components/List";
import Admin from "./components/Admin";

class App extends Component {
  componentDidMount() {
    //user loading disabled
    //store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppNavbar></AppNavbar>
            <Container>
              <WalletSearch />
              <Routes>
                <Route exact path="/" element={<Wallet />} />
                <Route exact path="/top/balance" element={<List />} />
                <Route exact path="/top/aROI" element={<List />} />
                <Route exact path="/admin" element={<Admin />} />
              </Routes>
            </Container>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
