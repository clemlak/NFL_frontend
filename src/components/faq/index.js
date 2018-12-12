import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

const Faq = () => (
  <Container>
    <Row className="py-3 justify-content-center">
      <Col xs="12" sm="10" md="10" lg="10">
        <h1>Frequently Asked Questions</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </Col>
    </Row>
    <Row className="py-3 justify-content-center">
      <Col xs="12" sm="10" md="10" lg="10">
        <h3>Praesent at luctus purus?</h3>
        <p>
          Nunc iaculis interdum felis, ac lacinia leo molestie id. Morbi nec odio nulla. Duis et nibh at massa egestas aliquet nec non lorem.
        </p>
      </Col>
    </Row>
    <Row className="py-3 justify-content-center">
      <Col xs="12" sm="10" md="10" lg="10">
        <h3>Nunc finibus nunc id sapien tristique sollicitudin?</h3>
        <p>
          Sed eget ipsum id arcu rutrum efficitur. Quisque enim nisl, posuere id lorem in, tempus efficitur tellus. Aenean sed viverra nulla. Sed eget ipsum id arcu rutrum efficitur.
        </p>
      </Col>
    </Row>
  </Container>
);

export default Faq;
