import React, { Component } from "react";
import logo from "./burgerins.png";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Quake Rankings</p>
          <a
            className="App-link"
            href="https://youtu.be/GZV1-pEY3po"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Rankings!
          </a>
          <table class="darkTable">
            <thead>
              <tr>
                <td>&nbsp;Player</td>
                <td>&nbsp;1st</td>
                <td>&nbsp;2nd&nbsp;</td>
                <td>&nbsp;Top4&nbsp;</td>
                <td>&nbsp;Top8</td>
                <td>&nbsp;Points</td>
                <td>&nbsp;Participations</td>
                <td>&nbsp;Finals&nbsp;</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&nbsp;rapha</td>
                <td>&nbsp;5</td>
                <td>&nbsp;0</td>
                <td>&nbsp;4</td>
                <td>&nbsp;1</td>
                <td>&nbsp;100</td>
                <td>&nbsp;10</td>
                <td>&nbsp;5</td>
              </tr>
              <tr>
                <td>&nbsp;Cypher</td>
                <td>&nbsp;4</td>
                <td>&nbsp;1</td>
                <td>&nbsp;3</td>
                <td>&nbsp;2</td>
                <td>&nbsp;80</td>
                <td>&nbsp;10</td>
                <td>&nbsp;5</td>
              </tr>
              <tr>
                <td>&nbsp;Toxjq</td>
                <td>&nbsp;3</td>
                <td>&nbsp;2</td>
                <td>&nbsp;4</td>
                <td>&nbsp;0</td>
                <td>&nbsp;70</td>
                <td>&nbsp;9</td>
                <td>&nbsp;5</td>
              </tr>
              <tr>
                <td>&nbsp;Av3k</td>
                <td>&nbsp;2</td>
                <td>&nbsp;3</td>
                <td>&nbsp;4</td>
                <td>&nbsp;4</td>
                <td>&nbsp;50</td>
                <td>&nbsp;13</td>
                <td>&nbsp;5</td>
              </tr>
              <tr>
                <td>&nbsp;Cooller</td>
                <td>&nbsp;1</td>
                <td>&nbsp;4</td>
                <td>&nbsp;5</td>
                <td>&nbsp;3</td>
                <td>&nbsp;30</td>
                <td>&nbsp;13</td>
                <td>&nbsp;5</td>
              </tr>
              <tr>
                <td>&nbsp;Raisy</td>
                <td>&nbsp;0</td>
                <td>&nbsp;5</td>
                <td>&nbsp;2</td>
                <td>&nbsp;2</td>
                <td>&nbsp;20</td>
                <td>&nbsp;9</td>
                <td>&nbsp;5</td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;
