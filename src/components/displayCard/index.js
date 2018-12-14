import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IPFS from 'ipfs-http-client';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

import RarityBadge from '../rarityBadge';

import ImgPlaceholder from '../../common/img/imgPlaceholder.png';

class DisplayCard extends Component {
  constructor(props) {
    super(props);

    this.ipfs = IPFS({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });

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
      bio: '',
      owner: '',
      uri: ImgPlaceholder,
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
          createdAt: card[4],
        });

        return this.ipfs.get(card[3]);
      })
      .then((files) => {
        const raw = files[0].content;
        const data = JSON.parse(raw.toString('utf8'));

        this.setState({
          bio: data.bio,
        });

        return contract.methods.tokenURI(cardId).call();
      })
      .then((uri) => {
        this.setState({
          uri,
        });

        return contract.methods.ownerOf(cardId).call();
      })
      .then((owner) => {
        this.setState({
          owner,
          isCardLoaded: true,
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

  displayCard = () => {
    const {
      cardId,
      name,
      teamId,
      rarity,
      createdAt,
      isCardLoaded,
      bio,
      uri,
      owner,
    } = this.state;

    if (isCardLoaded) {
      return (
        <div>
          <Row className="py-3 justify-content-center">
            <Col className="text-center" xs="12" sm="10" md="8" lg="8">
              <img src={uri} alt="img" />
            </Col>
          </Row>
          <Row className="py-3 justify-content-center">
            <Col xs="6" sm="5" md="4" lg="4">
              <h1>
                {name}
                {' '}
                <RarityBadge rarity={rarity} />
              </h1>
              <p>
                Card #
                {cardId}
                {' '}
                owned by
                {' '}
                {owner}
              </p>
            </Col>
            <Col className="text-right" xs="6" sm="5" md="4" lg="4">
              <p>
                {teamId}
              </p>
            </Col>
          </Row>
          <Row className="py-3 justify-content-center">
            <Col xs="12" sm="10" md="8" lg="8">
              <h3>Bio</h3>
              <p>
                {bio}
              </p>
            </Col>
          </Row>
          <Row className="py-3 justify-content-center">
            <Col xs="12" sm="10" md="8" lg="8">
              <ListGroup>
                <ListGroupItem>
                  {`Card created at: ${createdAt}`}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          <Row className="py-3 justify-content-center">
            <Col xs="12" sm="10" md="8" lg="8">
              <Button color="primary">
                Transfer
              </Button>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <Row className="py-3">
        <Col>
          <Card>
            <CardBody>
              <ListGroup>
                <ListGroupItem>
                  <div className="placeholder" />
                </ListGroupItem>
                <ListGroupItem>
                  <div className="placeholder" />
                </ListGroupItem>
                <ListGroupItem>
                  <div className="placeholder" />
                </ListGroupItem>
                <ListGroupItem>
                  <div className="placeholder" />
                </ListGroupItem>
                <ListGroupItem>
                  <div className="placeholder" />
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }

  render = () => (
    <Container fluid>
      {this.displayCard()}
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
