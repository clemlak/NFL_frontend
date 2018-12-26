import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

const Team = () => (
  <Container>
    <Row className="py-3 justify-content-center">
      <Col xs="12" sm="10" md="10" lg="10">
        <h1>Our team</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </Col>
    </Row>
    <Row className="py-3 justify-content-center">
      <Col xs="12" sm="10" md="10" lg="10">
        <p>
          Quisque auctor hendrerit tempor. Pellentesque aliquam est eu nisl egestas, pulvinar tincidunt felis varius. Duis in eleifend metus. Fusce scelerisque, nunc at ultricies posuere, mi est mollis urna, vel pharetra mauris ipsum sed augue. Suspendisse orci risus, auctor et tellus eu, laoreet condimentum massa. Cras elementum viverra mauris, in hendrerit nisl rhoncus congue. Proin tristique fringilla mauris. Quisque pulvinar, eros eget bibendum elementum, enim est varius sem, id posuere sapien odio nec orci.
        </p>
      </Col>
    </Row>
  </Container>
);

export default Team;
