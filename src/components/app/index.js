import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../header';
import Home from '../home';
import DisplayCard from '../displayCard';

class App extends Component {
  constructor(props) {
    super(props);

    const {
      address,
      contract,
      web3,
    } = this.props;

    this.state = {
      address,
      contract,
      web3,
    };
  }

  render() {
    const {
      address,
      contract,
      web3,
    } = this.state;

    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" render={() => (<Home address={address} contract={contract} web3={web3} />)} />
            <Route exact path="/card/:cardId" render={props => (<DisplayCard {...props} address={address} contract={contract} web3={web3} />)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  address: PropTypes.string.isRequired,
  contract: PropTypes.any.isRequired,
  web3: PropTypes.any.isRequired,
};

export default App;
