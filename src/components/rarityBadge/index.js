import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
} from 'reactstrap';

class RarityBadge extends Component {
  constructor(props) {
    super(props);

    const {
      rarity,
    } = this.props;

    this.state = {
      rarity,
      textDisplay: '',
      color: '',
    };
  }

  componentDidMount = () => {
    const {
      rarity,
    } = this.state;

    if (rarity === '0') {
      this.setState({
        color: 'secondary',
        textDisplay: 'Common',
      });
    } else if (rarity === '1') {
      this.setState({
        color: 'success',
        textDisplay: 'Rare',
      });
    } else if (rarity === '2') {
      this.setState({
        color: 'warning',
        textDisplay: 'Epic',
      });
    }
  }

  render = () => {
    const {
      textDisplay,
      color,
    } = this.state;

    return (
      <Badge color={color}>
        {textDisplay}
      </Badge>
    );
  }
}

RarityBadge.propTypes = {
  rarity: PropTypes.string.isRequired,
};

export default RarityBadge;
