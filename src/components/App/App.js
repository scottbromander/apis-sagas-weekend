import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../Views/Home/Home';
import Detail from '../Views/Detail/Detail';
import Edit from '../Views/Edit/Edit';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>Sweet movies</h1>

        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/details/:id" component={Detail} />
          <Route path="/edit/:id" component={Edit} />
        </Router>
      </div>
    );
  }
}

export default App;
