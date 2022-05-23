import React, { Component } from 'react'
import HomePage from '../pages/HomePage';
import InfoPage from '../pages/InfoPage';
import RsvpPage from '../pages/RsvpPage';
import GalleryPage from '../pages/GalleryPage';

const AnchorWrapper = ({ child, target }) => (
  <div className="anchor">
    <a href='/#' name={target}> </a>
    {child}
  </div>
);

export default class Landing extends Component {
  render() {
    return (
      <section>
        <AnchorWrapper child={<HomePage />} target="home" />
        <AnchorWrapper child={<InfoPage />} target="info" />
        <AnchorWrapper child={<RsvpPage />} target="rsvp" />
      </section>
    );
  }
}
