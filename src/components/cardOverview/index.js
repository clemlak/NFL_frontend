import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';
import {
  Card,
  CardImg,
  CardBody,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import RarityBadge from '../rarityBadge';

import ImgPlaceholder from '../../common/img/imgPlaceholder.png';

class CardOverview extends Component {
  constructor(props) {
    super(props);

    const {
      address,
      contract,
      cardId,
    } = this.props;

    this.state = {
      address,
      contract,
      cardId,
      name: '',
      teamId: 0,
      rarity: 0,
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
      cardId,
    } = this.state;

    contract.methods.getCard(cardId).call()
      .then((card) => {
        this.setState({
          name: card[0],
          teamId: card[1],
          rarity: card[2],
        });

        return contract.methods.tokenURI(cardId).call();
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
      name,
      teamId,
      rarity,
      isCardLoaded,
    } = this.state;

    if (isCardLoaded) {
      return (
        <div className="text-center card__text">
          <p className="lead mb-0">
            {name}
            {' '}
            <RarityBadge rarity={rarity} />
          </p>
          <p className="mb-0">
            <small>
              {teamId}
            </small>
          </p>
        </div>
      );
    }

    return (
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
    );
  }

  render = () => {
    const {
      uri,
      cardId,
    } = this.state;

    return (
      <NavLink to={`/card/${cardId}`}>
        <Card>
          <CardImg top width="100%" src={uri} alt="Card image cap" />
          <CardBody>
            {this.displayCard()}
          </CardBody>
        </Card>
      </NavLink>
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
