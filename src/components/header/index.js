import React, { Component } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

import Logo from '../../common/img/logos/nflcryptofootball_logo.png';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    const {
      isOpen,
    } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  render = () => {
    const {
      isOpen,
    } = this.state;

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand className="d-block d-md-none">
            <img src={Logo} alt="logo" className="header__logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mx-auto align-items-center" navbar>
              <NavItem>
                <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to="/cards" className="nav-link" activeClassName="active">My cards</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to="/marketplace" className="nav-link" activeClassName="active">Marketplace</NavLink>
              </NavItem>
              <NavbarBrand className="d-none d-md-block">
                <img src={Logo} alt="logo" className="header__logo" />
              </NavbarBrand>
              <NavItem>
                <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to="/cards" className="nav-link" activeClassName="active">My cards</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to="/marketplace" className="nav-link" activeClassName="active">Marketplace</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
