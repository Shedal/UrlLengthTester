import React, { Component } from 'react';
import { Input } from 'reactstrap';

export class UrlLengthTester extends Component {
  static displayName = UrlLengthTester.name;

  constructor(props) {
    super(props);
    this.state = { charsToSend: 0, returnedData: "" };
  }

  render() {
    let contents =
      (!!this.state.returnedData &&
        <div className="alert alert-success" role="alert">
          The server sees a URL with length: <strong>{this.state.returnedData}</strong></div>) ||
      (!!this.state.returnedError &&
        <div className="alert alert-danger" role="alert">
          {this.state.returnedError}</div>);

    return (
      <div className="w-50 justify-content-center align-self-center text-white text-center align-middle">
        <div className="pb-3">
          <Input autoFocus className="text-center" placeholder="Characters to send" value={this.state.charsToSend || ""}
                 onChange={this.handleInputChange}
                 onKeyDown={this.handleInputKeyDown}/>
        </div>
        <button className="btn btn-block btn-outline-primary px-4 me-sm-3 fw-bold"
                onClick={this.sendApiRequest}>Send
        </button>

        <p className="pt-4">
          {contents}
        </p>
      </div>
    );
  }

  handleInputChange = async (event) => {
    this.setState({ charsToSend: parseInt(event.target.value) });
  }

  sendApiRequest = async () => {
    this.setState({ returnedData: "", returnedError: "" });

    const location = window.location;
    const baseUrl = `${location.protocol}//${location.host}/LengthTest?p=`;

    if (this.state.charsToSend < baseUrl.length) {
      this.state.charsToSend = baseUrl.length;
    }

    let url = `${baseUrl}${'a'.repeat(this.state.charsToSend - baseUrl.length)}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          this.setState({ returnedError: response.statusText });
        }
        return response;
      })
      .then(response => response.text())
      .then(data => this.setState({ returnedData: data }))
      .catch(error => this.setState({ returnedError: error }));
  }

  handleInputKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await this.sendApiRequest();
    }
  }
}
