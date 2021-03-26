import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    fetch("http://localhost:3001/campaigns/5fb5c517a2dcb08e7fed91ae")
      .then((res) => res.json())
      .then((users) => this.setState({ users }));
  }

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        <h1>USERS</h1>
        <ul>
          <ul>
            <h1>Campaign Title: {users.campaignTitle}</h1>
                <p>id: {users._id}</p>
                <p>description: {users.description}</p>
          </ul>
        </ul>
      </div>
    );
  }
}
export default App;
