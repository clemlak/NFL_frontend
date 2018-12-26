import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IPFS from 'ipfs-http-client';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  FormGroup,
  Label,
  Button,
  Form,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSync,
  faCheck,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';

class Admin extends Component {
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
    } = this.props;

    this.state = {
      address,
      contract,
      web3,
      name: '',
      teamId: '',
      rarity: 0,
      bio: '',
      height: 0,
      weight: 0,
      power: 0,
      uri: '',
      recipient: '',
      txState: 'null',
    };
  }

  handleChange = (e) => {
    if (e.target.name === 'nameInput') {
      this.setState({ name: e.target.value });
    } else if (e.target.name === 'teamIdInput') {
      this.setState({ teamId: e.target.value });
    } else if (e.target.name === 'uriInput') {
      this.setState({ uri: e.target.value });
    } else if (e.target.name === 'recipientInput') {
      this.setState({ recipient: e.target.value });
    } else if (e.target.name === 'rarityInput') {
      this.setState({ rarity: e.target.value });
    } else if (e.target.name === 'bioInput') {
      this.setState({ bio: e.target.value });
    } else if (e.target.name === 'heightInput') {
      this.setState({ height: e.target.value });
    } else if (e.target.name === 'weightInput') {
      this.setState({ weight: e.target.value });
    } else if (e.target.name === 'powerInput') {
      this.setState({ power: e.target.value });
    }
  }

  createCard = (e) => {
    const {
      contract,
      name,
      teamId,
      rarity,
      bio,
      height,
      weight,
      power,
      uri,
      recipient,
    } = this.state;

    e.preventDefault();

    const data = {
      bio,
      height,
      weight,
      power,
    };

    this.setState({
      txState: 'pending',
    });

    this.ipfs.add(Buffer.from(JSON.stringify(data)))
      .then((res) => {
        const { hash } = res[0];
        console.log(hash);

        contract.methods.createCard(
          name,
          teamId,
          rarity,
          hash,
          uri,
          recipient,
        ).send()
          .on('transactionHash', (txHash) => {
            console.log(txHash);
          })
          .on('receipt', () => {
            this.setState({
              txState: 'success',
            });
          })
          .on('error', () => {
            this.setState({
              txState: 'error',
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  returnButton = () => {
    const {
      txState,
    } = this.state;

    if (txState === 'null') {
      return (
        <Button color="primary" onClick={this.createCard} block>
          Create new card
        </Button>
      );
    }

    if (txState === 'pending') {
      return (
        <Button color="warning" disabled block>
          <FontAwesomeIcon icon={faSync} spin />
          {' '}
          Transaction is pending...
        </Button>
      );
    }

    if (txState === 'success') {
      return (
        <Button color="success" disabled block>
          <FontAwesomeIcon icon={faCheck} />
          {' '}
          Transaction succeed!
        </Button>
      );
    }

    return (
      <Button color="danger" block disabled>
        <FontAwesomeIcon icon={faExclamation} />
        {' '}
        An error occurred!
      </Button>
    );
  }

  render = () => {
    const {
      name,
      teamId,
      rarity,
      bio,
      weight,
      height,
      power,
      uri,
      recipient,
      txState,
    } = this.state;

    return (
      <Container>
        <Row className="py-3 justify-content-center">
          <Col xs="12" sm="10" md="10" lg="10">
            <Card>
              <CardHeader>
                Create a new card
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="nameInput">Name</Label>
                        <Input type="text" name="nameInput" id="nameInput" placeholder="John Doe" value={name} onChange={this.handleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="teamIdInput">Team</Label>
                        <Input type="text" name="teamIdInput" id="teamIdInput" placeholder="42" value={teamId} onChange={this.handleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="uriInput">Token URI</Label>
                        <Input type="text" name="uriInput" id="uriInput" placeholder="https://token.com/tokenId" value={uri} onChange={this.handleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="recipientInput">Recipient</Label>
                        <Input type="text" name="recipientInput" id="recipientInput" placeholder="0x2d79097b9E4c4f41654B2C91C39FD2c97Af00c76" value={recipient} onChange={this.handleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="rarityInput">Rarity</Label>
                        <Input type="select" name="rarityInput" id="rarityInput" onChange={this.handleChange} value={rarity}>
                          <option value="0">Common</option>
                          <option value="1">Rare</option>
                          <option value="2">Epic</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="weightInput">Weight</Label>
                        <Input type="text" name="weightInput" id="weightInput" placeholder="42" value={weight} onChange={this.handleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="heightInput">Height</Label>
                        <Input type="text" name="heightInput" id="heightInput" placeholder="6" value={height} onChange={this.handleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="powerInput">Power</Label>
                        <Input type="text" name="powerInput" id="powerInput" placeholder="36" value={power} onChange={this.handleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="bioInput">Bio</Label>
                        <Input
                          type="textarea"
                          name="bioInput"
                          id="bioInput"
                          value={bio}
                          onChange={this.handleChange}
                          placeholder="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti."
                          rows="4"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                {this.returnButton()}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Admin.propTypes = {
  address: PropTypes.string.isRequired,
  contract: PropTypes.any.isRequired,
  web3: PropTypes.any.isRequired,
};

export default Admin;
