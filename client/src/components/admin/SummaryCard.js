import React, { Component } from "react";
import PropTypes from "prop-types";

class SummaryCard extends Component {
  render() {
    return (
        <div className="card summary-card">
          <h2>Summary</h2>
          <div className="card-item">
            <h3>Total Guests</h3>
            {this.props.totalGuests}
          </div>
          <div className="card-item">
            <h3>Responses</h3>
            {this.props.responses}
          </div>
          <div className="card-item">
            <h3>Attending</h3>
            {this.props.attending}
          </div>
        </div>
    );
  }
}

SummaryCard.propTypes = {
  totalGuests: PropTypes.number.isRequired,
  responses: PropTypes.number.isRequired,
  attending: PropTypes.number.isRequired,
};

export default SummaryCard;

