import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import About from '../about';
import Admin from '../admin';
import Contact from '../contact';
import Profile from '../profile';
import DisplayCard from '../displayCard';
import Faq from '../faq';
import Footer from '../footer';
import Header from '../header';
import Home from '../home';
import Marketplace from '../marketplace';
import NoMatch from '../noMatch';
import Privacy from '../privacy';
import Team from '../team';
import Terms from '../terms';

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
            <Route exact path="/" render={props => (<Home {...props} address={address} contract={contract} web3={web3} />)} />
            <Route exact path="/about" render={About} />
            <Route exact path="/admin" render={props => (<Admin {...props} address={address} contract={contract} web3={web3} />)} />
            <Route exact path="/contact" render={Contact} />
            <Route exact path="/profile" render={props => (<Profile {...props} address={address} contract={contract} web3={web3} />)} />
            <Route exact path="/faq" render={Faq} />
            <Route exact path="/marketplace" render={props => (<Marketplace {...props} address={address} contract={contract} web3={web3} />)} />
            <Route exact path="/privacy" render={Privacy} />
            <Route exact path="/team" render={Team} />
            <Route exact path="/terms" render={Terms} />

            <Route exact path="/card/:cardId" render={props => (<DisplayCard {...props} address={address} contract={contract} web3={web3} />)} />

            <Route render={NoMatch} />
          </Switch>
          <Footer />
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
