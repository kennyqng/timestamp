import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import './App.css';

function App() {
  return (
    <Router basename={"/timestamp"}>
      <Route exact path="/" component={Home}></Route>
    </Router>
  );
}

export default App;
