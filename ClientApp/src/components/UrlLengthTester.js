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
      (!!this.state.returnedData && <div><h4>Server-side view:</h4>
        <div>{this.state.returnedData}</div>
      </div>) ||
      (!!this.state.returnedError && <div><h4>Error:</h4>
        <div>{this.state.returnedError}</div>
      </div>);

    return (
      <div className="w-50 justify-content-center align-self-center text-white text-center align-middle">
        <div className="pb-3">
          <Input className="text-center" placeholder="Characters to send" onChange={this.handleInputChange}
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

    const url = `LengthTest?p=${'a'.repeat(this.state.charsToSend)}`;

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
