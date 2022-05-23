import React, { Component } from 'react'
import Countdown from "../Countdown";

export default class HomePage extends Component {
  render() {
    return (
      <section id="homepage">
        <h1>Mary and Ryan's Wedding Party 2.0</h1>
        <Countdown />
      </section>
    );
  }
}
