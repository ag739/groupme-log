import React from 'react';

export default class EnterToken extends React.Component {
  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    let at = document.getElementById('access_token').value;

    this.props.handleButton(at);
  }

  render() {
    let classes = this.props.active ? "hamburger" : "hamburger hide";

    const svg = (
      <svg className={classes} id="hamburger" height="30" width="30" onClick={this.props.showGroups}>
        <line x1="0" y1="3" x2="30" y2="3" />
        <line x1="0" y1="15" x2="30" y2="15" />
        <line x1="0" y1="27" x2="30" y2="27" />
      </svg>
    );

    return (
      <div className="enter-token">
        <div>
          {svg}
        </div>

        <div>
          <label htmlFor="access_token">Access Token:</label>

          <div className="tooltip-div">
            <span className="tooltip-help">?</span>
            <span className="tooltip">
              Log into your GroupMe account <a href="https://dev.groupme.com/">here</a> and then click on the button on the upper right hand corner that says "Access Token"
            </span>
          </div>

          <input className="input" type="password" name="access_token" id="access_token" />

          <input type="submit" className="button" onClick={this.handleButton} value="GO" />
        </div>
      </div>
    );
  }
}
