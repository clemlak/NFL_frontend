import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

class Home extends Component {
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
      cardId: 0,
      name: '',
      teamId: 0,
      createdAt: 0,
    };
  }

  render = () => {
    return (
      <Container>
        <Row>
          <Col>
            Welcome home!
          </Col>
        </Row>
      </Container>
    );
  }
}

Home.propTypes = {
  address: PropTypes.string.isRequired,
  contract: PropTypes.any.isRequired,
  web3: PropTypes.any.isRequired,
};

export default Home;
