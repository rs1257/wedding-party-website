import React, { Component } from "react";

export default class InfoPage extends Component {
  render() {

    return (
      <section id="infopage">
        <h1>Info</h1>
        <p>We cannot wait for you to join us at 7:00pm on the 30th October at New Craven Hall for our wedding party.</p>
        <br />
        <p>Barbecue food will be provided. We will be back in our wedding attire but feel free to dress smart/casual.</p>
        <br />
        <p>Local hotels with 10% off best available rates for this venue include The Clayton and Malmaison. Contact Mary for details if needed.</p>
        <br />
        <p>The address is: Unit 2 Fairfield House, New Craven Gate, Leeds, LS11 5NF</p>
        {<iframe className="iframe-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2357.3419427910817!2d-1.5438688840109331!3d53.78340134958464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795c25b2718661%3A0x73868024ea764de9!2sNew%20Craven%20Hall!5e0!3m2!1sen!2sus!4v1615118609261!5m2!1sen!2sus" loading="lazy"></iframe>} 
      </section>
    );
  }
}