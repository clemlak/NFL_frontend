import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap';

import RarityBadge from '../rarityBadge';

import ImgPlaceholder from '../../common/img/imgPlaceholder.png';

class CardOverview extends Component {
  constructor(props) {
    super(props);

    const {
      address,
      contract,
      web3,
      cardId,
    } = this.props;

    this.state = {
      address,
      contract,
      web3,
      cardId,
      name: '',
      teamId: 0,
      rarity: 0,
      data: '',
      createdAt: 0,
      cardOwner: '',
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
          data: card[3],
          createdAt: card[4],
        });

        return contract.methods.tokenURI(cardId).call()
      })
      .then((uri) => {
        this.setState({
          uri,
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
    } = this.state;

    if (isCardLoaded) {
      return (
        <div className="text-center">
          <p className="lead mb-0">
            {name}
            {' '}
            <RarityBadge rarity={rarity} />
          </p>
          <p>
            <small>
              {teamId}
            </small>
          </p>

          <NavLink to={`/card/${cardId}`} className="btn btn-primary">
            More info
          </NavLink>
        </div>
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

  render = () => {
    const {
      uri,
    } = this.state;

    return (
      <Card>
        <CardImg top width="100%" src={uri} alt="Card image cap" />
        <CardBody>
          {this.displayCard()}
        </CardBody>
      </Card>
    );
  }
}

CardOverview.propTypes = {
  address: PropTypes.string.isRequired,
  contract: PropTypes.any.isRequired,
  web3: PropTypes.any.isRequired,
  cardId: PropTypes.number.isRequired,
};

export default CardOverview;
