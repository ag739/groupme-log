import React from 'react';

export default class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton(e) {
    let targ = e.target;
    let maxIter = 3;

    while (!targ.classList.contains("group-div") && maxIter > 0) {
      targ = targ.parentElement;
      maxIter--;
    }

    if (targ.classList.contains("group-div")) {
      this.props.handleButton(targ.dataset["id"]);
    }
  }

  render() {
    let classes = this.props.active ? "messages-active group-list" : "group-list";

    const groups = this.props.groups.map((g) => 
      <div className="group-div" key={g.group_id} data-id={g.group_id} onClick={this.handleButton}>
        <img className="group-img" src={g.image_url === null ? "https://i.groupme.com/300x300.png.6485c42fdeaa45b5a4b986b9cb1c91a2.preview" : g.image_url} alt="group-img" />
        <span className="group-name">{g.name}</span>
      </div>
    );

    return (
      <div className={classes} id="group-list">{groups}</div>
    );
  }
}
