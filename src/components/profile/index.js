import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  CardColumns,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from 'reactstrap';
import copy from 'copy-to-clipboard';

import CardOverview from '../cardOverview';

class Profile extends Component {
  constructor(props) {
    super(props);

    const {
      address,
      contract,
      web3,
    } = this.props;

    this.state = {
      address,
      balance: 0,
      tokens: [],
      contract,
      web3,
      isAddressCopied: false,
    };
  }

  componentDidMount = () => {
    this.refreshBalance();
  }

  refreshBalance = () => {
    const {
      contract,
      address,
    } = this.state;

    contract.methods.balanceOf(address).call()
      .then((balance) => {
        this.setState({
          balance,
        });

        this.getTokens();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTokens = () => {
    const {
      address,
      balance,
      contract,
      tokens,
    } = this.state;

    for (let i = 0; i < balance; i += 1) {
      contract.methods.tokenOfOwnerByIndex(address, i).call()
        .then((tokenId) => {
          tokens.push(tokenId);

          console.log('Token id', tokenId);

          this.setState({
            tokens,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  displayCards = () => {
    const {
      address,
      contract,
      web3,
      tokens,
    } = this.state;

    if (tokens.length === 0) {
      return (
        <div className="text-center">
          <p>You do not have any card!</p>
          <NavLink className="btn btn-primary" to="/marketplace">
            Visit the marketplace
          </NavLink>
        </div>
      );
    }

    const cards = [];

    for (let i = 0; i < tokens.length; i += 1) {
      cards.push(
        <CardOverview
          key={i}
          address={address}
          contract={contract}
          web3={web3}
          cardId={tokens[i]}
        />,
      );
    }

    return (
      <CardColumns>
        {cards}
      </CardColumns>
    );
  }

  handleCopyAddress = () => {
    const {
      address,
    } = this.state;

    copy(address);

    this.setState({
      isAddressCopied: true,
    });
  }

  render = () => {
    const {
      address,
      balance,
      tokens,
      isAddressCopied,
    } = this.state;

    return (
      <Container>
        <Row className="py-3 justify-content-center">
          <Col xs="12" sm="10" md="10" lg="10">
            <h1>My wallet</h1>
            <p>
              Your address is:
            </p>
            <InputGroup>
              <Input value={address} readOnly />
              <InputGroupAddon addonType="append">
                <Button onClick={this.handleCopyAddress}>
                  {isAddressCopied ? ('Address copied!') : ('Copy address')}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
        <Row className="py-3 justify-content-center">
          <Col xs="12" sm="10" md="10" lg="10">
            <h1>My cards</h1>
            <p>
              {`Your balance is ${balance}`}
            </p>
            {this.displayCards()}
          </Col>
        </Row>
      </Container>
    );
  }
}

Profile.propTypes = {
  address: PropTypes.string.isRequired,
  contract: PropTypes.any.isRequired,
  web3: PropTypes.any.isRequired,
};

export default Profile;
