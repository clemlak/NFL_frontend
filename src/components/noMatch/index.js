import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

const NoMatch = () => (
  <Container>
    <Row className="py-3 justify-content-center">
      <Col xs="12" sm="10" md="10" lg="10">
        <h1>Ooops, page not found!</h1>
        <p className="lead">
          The page you are looking for does not exist!
        </p>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
