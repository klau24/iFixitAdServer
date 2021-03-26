import React, { Component } from "react";
import "./App.css";

class GatherAds extends Component {
  constructor(props) {
    super(props);
    this.state = { ads: [], open: false };
  }

  componentDidMount() {
    fetch("http://localhost:3001/listads/0/0")
      .then((res) => res.json())
      .then((ad) => this.setState({ ad }));
  }

  render() {
    const { ads } = this.state;
    return (
      <div className="gatherAds">
        <h1>Ads</h1>
        <p>{ads._id}</p>
      </div>
    );
  }
}
export default GatherAds;
