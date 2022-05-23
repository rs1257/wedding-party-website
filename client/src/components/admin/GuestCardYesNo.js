import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import TextAreaField from "../common/TextAreaField";
import TextFieldInput from "../common/TextFieldInput";
import SelectField from "../common/SelectField";

const canAttend = {
  waiting: 'Waiting',
  yes: 'Yes',
  no: 'No'
};

class GuestCardYesNo extends Component {
  constructor(props) {
    super(props);

    const guest = this.props.guest;

    this.state = {
      name: guest.name,
      attending: guest.attending,
      additionalNotes: guest.additionalNotes,
      id: guest._id,
      disabled: true,
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChange = this.onChange.bind(this);
  }

  handleEdit() {
    this.setState({disabled: !this.state.disabled});
  }

  handleSave() {
    this.setState({disabled: true});
    axios
      .post("/api/rsvp/edit", this.state)
      .then((res) => {
        this.props.updateList();
      })
      .catch((err) => {
        this.setState({errors: err.response.data});
      });
    
  }

  handleDelete() {
    axios
      .post("/api/rsvp/delete", {id: this.state.id })
      .then((res) => {
        this.props.updateList();
      })
      .catch((err) => {
        this.setState({errors: err.response.data});
      });
    
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (<div className={"card attending-" + this.state.attending}>
              <h3>Name</h3>
              <TextFieldInput
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                disabled={this.state.disabled}
              />
              <h3>Attending</h3>
              <SelectField
                name="attending"
                value={this.state.attending}
                options={canAttend}
                onChange={this.onChange}
                disabled={this.state.disabled}
              />
              <h3>Additional Notes</h3>
              <TextAreaField
                name="additionalNotes"
                value={this.state.additionalNotes}
                onChange={this.onChange}
                disabled={this.state.disabled}
              />
              <div className="actions">
                <button className="edit" onClick={this.handleEdit}>&#9998;</button>
                <button className="tick" onClick={this.handleSave}>&#10004;</button>
                <button className="cross" onClick={this.handleDelete}>&#10006;</button>
              </div>
            </div>
    );
  }
}

GuestCardYesNo.propTypes = {
  guest: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
};

export default GuestCardYesNo;

