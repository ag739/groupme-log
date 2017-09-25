import React from 'react';

export default class MessageList extends React.Component {
  render() {
    if (this.props.msgs === null) {
      return (
        <div className="message-list">
          <h1>Loading...</h1>
        </div>
      );
    } else if (this.props.msgs["years"].length === 0) {
      return (
        <div className="message-list">
          <h1>Oops! It appears there are no messages on this day!</h1>
        </div>
      );
    } else {
      const messages = this.props.msgs["years"].map((year) =>
        (<div>
          <h1>On this day in {year}...</h1>
          {this.props.msgs[year].map((m) =>
            <Message msg={m} />
          )}
        </div>)
      );

      return (
        <div className="message-list">
          {messages}
        </div>
      );
    }
  }
}

class Message extends React.Component {
  renderImage(attach) {
    if (attach["type"] === "image") {
      return <img className="msg-img" src={attach.url} alt="message" />;
    } else {
      return null;
    }
  }

  render() {
    let msg = this.props.msg;

    if (msg.system) {
      return (
        <div className="msg msg-system">
          <p className="msg-txt">
            {msg.text}
          </p>
        </div>
      );
    } else {

      const attachments = msg.attachments.map((attach) =>
        this.renderImage(attach)
      );

      return (
        <div className="msg">
          <div className="msg-info">
            <img className="msg-avatar" src={msg.avatar === null ? "https://i.groupme.com/300x300.png.6485c42fdeaa45b5a4b986b9cb1c91a2.preview" : msg.avatar} alt="avatar-url" />
            <div className="msg-author">
              <span className="msg-name">{msg.name}</span>
              <span className="msg-time">{msg.time}</span>
            </div>
          </div>
          <p className="msg-txt">
            {attachments}
            {msg.text}
          </p>
        </div>
      );
    }
  }
}