import React, { Component } from "react";
import PropTypes from "prop-types";

class GuestCard extends Component {
  constructor(props) {
    super(props);

    const guest = this.props.guest;
    const menu = this.props.menu;

    this.state = {
      name: guest.name,
      attending: guest.attending,
      additionalNotes: guest.additionalNotes,
      disabled: true,
      menu: menu,
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit() {
    this.setState({disabled: false});
  }

  handleSave() {
    this.setState({disabled: true});
  }

  handleDelete() {
  }
  // I need to port onchange from YesNo card to here too.
  render() {
    const { starter, main, dessert } = this.state.menu;
    return (<div className={"card attending-" + this.state.attending}>
              <h3>Name</h3>
              <input type="text" value={this.state.name} disabled={this.state.disabled} />
              <h3>Attending</h3>
              <select value={this.state.attending} disabled={this.state.disabled}>
                <option value="waiting">Waiting</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {this.state.attending === 'yes' && <>
                <h3>Menu Choices</h3>
                <label>Starter</label>
                <select disabled={this.state.disabled}>
                  {Object.values(starter.split('\n')).map((s) => {
                    return <option>{s}</option>
                  })}
                </select>
                <label>Main</label>
                <select disabled={this.state.disabled}>
                  {Object.values(main.split('\n')).map((m) => {
                    return <option>{m}</option>
                  })}
                </select>
                <label>Dessert</label>
                <select disabled={this.state.disabled}>
                  {Object.values(dessert.split('\n')).map((d) => {
                    return <option>{d}</option>
                  })}
                </select> 
              </>}
              <h3>Additional Notes</h3>
              <textarea disabled={this.state.disabled}>{this.state.additionalNotes}</textarea>
              <div className="actions">
                <button className="edit" onClick={this.handleEdit}>&#9998;</button>
                <button className="tick" onClick={this.handleSave}>&#10004;</button>
                <button className="cross" onClick={this.handleDelete}>&#10006;</button>
              </div>
            </div>
    );
  }
}

GuestCard.propTypes = {
  guest: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
};

export default GuestCard;

