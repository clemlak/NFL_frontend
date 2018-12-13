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
    <Row className="py-3 justify-content-center">
      <Col xs="12" sm="3" md="3" lg="3">
        <Nav vertical>
          <NavItem>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/profile">
              My profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/marketplace">
              Marketplace
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      <Col xs="12" sm="3" md="3" lg="3">
        <Nav vertical>
          <NavItem>
            <NavLink className="nav-link" to="/faq">
              FAQ
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/team">
              Team
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      <Col xs="12" sm="3" md="3" lg="3">
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
    <Row className="py-3 justify-content-center">
      <Col className="text-center">
        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
          <FontAwesomeIcon icon={faTwitter} size="2x" className="mx-1" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
          <FontAwesomeIcon icon={faFacebook} size="2x" className="mx-1" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
          <FontAwesomeIcon icon={faInstagram} size="2x" className="mx-1" />
        </a>
        <a href="https://www.discord.com/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
          <FontAwesomeIcon icon={faDiscord} size="2x" className="mx-1" />
        </a>
        <a href="https://www.telegram.com/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
          <FontAwesomeIcon icon={faTelegram} size="2x" className="mx-1" />
        </a>
      </Col>
    </Row>
    <Row className="py-3 justify-content-center">
      <Col xs="12" sm="10" md="10" lg="10" className="text-center">
        <small>
          © 2018 Hercules SEZC. NFL Enterprises LLC. NFL and the NFL shield design are registered trademarks of the National Football League. The team names, logos and uniform designs are registered trademarks of the teams indicated. All other NFL-related trademarks are trademarks of the National Football League.
        </small>
      </Col>
    </Row>
  </Container>
);

export default Footer;
