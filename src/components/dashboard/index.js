import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

class Dashboard extends Component {
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
      contract,
      web3,
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  transferCard = () => {
    const {
      contract,
      address,
      recipient,
      cardToTransfer,
    } = this.state;

    contract.methods.transferFrom(address, recipient, cardToTransfer).send()
      .then((tx) => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render = () => {
    const {
      address,
      balance,
    } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <h1>{`Welcome ${address}`}</h1>
            <p>
              {`Your balance is ${balance}`}
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  address: PropTypes.string.isRequired,
  contract: PropTypes.any.isRequired,
  web3: PropTypes.any.isRequired,
};

export default Dashboard;
