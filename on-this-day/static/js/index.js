import React from 'react';
import ReactDOM from 'react-dom';

import EnterToken from './EnterToken';
import GroupList from './GroupList';
import MessageList from './MessageList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      at:     '',
      groups: [],
      active: '',
      msgs:   null
    }
    this.setAccessToken = this.setAccessToken.bind(this);
    this.setActiveGroup = this.setActiveGroup.bind(this);
  }

  showGroups() {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('group-list').classList.toggle('mobile-active');
  }

  setAccessToken(at) {
    let self = this;

    $.ajax({
      url: 'ajax/listGroups',
      data: {
        'at': at
      },
      datatype: 'json',
      success: function(data) {
        self.setState({
          at:     at,
          groups: data["groups"]
        });
      }
    })
  }

  setActiveGroup(id) {
    if (document.getElementById('hamburger').classList.contains('active')) this.showGroups();

    let self = this;

    $.ajax({
      url: 'ajax/getMessages',
      data: {
        'at': this.state.at,
        'id': id
      },
      datatype: 'json',
      beforeSend: function() {
        self.setState({
          active: id,
          msgs:   null
        });
      },
      success: function(data) {
        self.setState({
          msgs: data["messages"]
        });
      }
    });

  }

  render() {
    return (
      <div>
        <EnterToken handleButton={this.setAccessToken} active={this.state.active !== ''} showGroups={this.showGroups} />
        <div className="main-content">
          <GroupList handleButton={this.setActiveGroup} groups={this.state.groups} active={this.state.active !== ''} />
          {this.state.active !== '' && <MessageList msgs={this.state.msgs} />}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'))
