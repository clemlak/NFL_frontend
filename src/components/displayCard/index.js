import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

class DisplayCard extends Component {
  constructor(props) {
    super(props);

    const {
      address,
      contract,
      web3,
      match: {
        params: {
          cardId,
        },
      },
    } = this.props;

    this.state = {
      address,
      contract,
      web3,
      cardId,
      name: '',
      teamId: 0,
      rarity: 0,
      createdAt: 0,
      cardOwner: '',
      isCardLoaded: false,
    };
  }

  componentDidMount = () => {
    this.updateCard();
  }

  updateCard = () => {
    const {
      contract,
      address,
      cardId,
    } = this.state;

    contract.methods.getCard(cardId).call()
      .then((card) => {
        this.setState({
          name: card[0],
          teamId: card[1],
          rarity: card[2],
          createdAt: card[3],
          isCardLoaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  displayCard = () => {
    const {
      cardId,
      name,
      teamId,
      rarity,
      createdAt,
      isCardLoaded,
    } = this.state;

    if (isCardLoaded) {
      return (
        <ListGroup>
          <ListGroupItem>
            {`Card id: ${cardId}`}
          </ListGroupItem>
          <ListGroupItem>
            {`Card name: ${name}`}
          </ListGroupItem>
          <ListGroupItem>
            {`Card team Id: ${teamId}`}
          </ListGroupItem>
          <ListGroupItem>
            {`Card rarity: ${rarity}`}
          </ListGroupItem>
          <ListGroupItem>
            {`Card created at: ${createdAt}`}
          </ListGroupItem>
        </ListGroup>
      );
    }

    return (
      <ListGroup>
        <ListGroupItem>
          <div className="placeholder"></div>
        </ListGroupItem>
        <ListGroupItem>
          <div className="placeholder"></div>
        </ListGroupItem>
        <ListGroupItem>
          <div className="placeholder"></div>
        </ListGroupItem>
        <ListGroupItem>
          <div className="placeholder"></div>
        </ListGroupItem>
        <ListGroupItem>
          <div className="placeholder"></div>
        </ListGroupItem>
      </ListGroup>
    );
  }

  render = () => (
    <Container fluid>
      <Row className="py-3">
        <Col>
          <Card>
            <CardBody>
              {this.displayCard()}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

DisplayCard.propTypes = {
  address: PropTypes.string.isRequired,
  contract: PropTypes.any.isRequired,
  web3: PropTypes.any.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      cardId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DisplayCard;
