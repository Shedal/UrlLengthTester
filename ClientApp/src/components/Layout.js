import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="bg-dark">
        <Container className="d-flex min-vh-100 h-100 justify-content-center">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
