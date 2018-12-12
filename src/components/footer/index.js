import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faDiscord,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <Container fluid className="footer py-3">
    <Row className="py-2">
      <Col>
        <Nav vertical>
          <NavItem>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/cards">
              My cards
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/marketplace">
              Marketplace
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      <Col>
        <Nav vertical>
          <NavItem>
            <NavLink className="nav-link" to="/team">
              Team
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/faq">
              FAQ
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      <Col>
        <Nav vertical>
          <NavItem>
            <NavLink className="nav-link" to="/privacy">
              Privacy
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/terms">
              Terms of Use
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/contact">
              Contact us
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
    </Row>
    <Row className="py-2">
      <Col className="text-center">
        <FontAwesomeIcon icon={faTwitter} size="2x" className="mx-1" />
        <FontAwesomeIcon icon={faFacebook} size="2x" className="mx-1" />
        <FontAwesomeIcon icon={faInstagram} size="2x" className="mx-1" />
        <FontAwesomeIcon icon={faDiscord} size="2x" className="mx-1" />
        <FontAwesomeIcon icon={faTelegram} size="2x" className="mx-1" />
      </Col>
    </Row>
    <Row className="py-2">
      <Col className="text-center">
        <small>
          © 2018 Hercules SEZC. NFL Enterprises LLC. NFL and the NFL shield design are registered trademarks of the National Football League. The team names, logos and uniform designs are registered trademarks of the teams indicated. All other NFL-related trademarks are trademarks of the National Football League.
        </small>
      </Col>
    </Row>
  </Container>
);

export default Footer;
