import React, { Component } from 'react'
import TextFieldInput from '../common/TextFieldInput';
import SelectField from '../common/SelectField';
import axios from 'axios';
import TextAreaField from '../common/TextAreaField';
import Button from '../common/Button';

const canAttend = {
  yes: 'Yes',
  no: 'No'
};

class RsvpPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      canAttend: getFirstKey(canAttend),
      additionalNotes: '',
      hasSubmitted: false,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    axios
      .post("/api/rsvp/add", this.state)
      .then((res) => {
        this.setState({ hasSubmitted: true, errors: {} });
        
        this.resetInterval = setInterval(() => { 
          clearInterval(this.resetInterval);
          this.setState({ 
            hasSubmitted: false, 
            name: "", 
            canAttend: getFirstKey(canAttend),
            additionalNotes: '' });
        }, 7000);

      })
      .catch((err) => {
        console.log(err);
        this.setState({errors: err.response.data});
      });

  }

  render() {
    const { errors } = this.state;

    return (
      <section id="rsvppage">
        <h1>RSVP</h1>
        { !this.state.hasSubmitted &&
        <>
          <form noValidate onSubmit={this.onSubmit} className="rsvp">
            <TextFieldInput
              label="Name"
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.name}
              error={errors.name}
              onChange={this.onChange}
            />
            <SelectField
              label="Can Attend"
              name="canAttend"
              value={this.state.canAttend}
              options={canAttend}
              onChange={this.onChange}
            />
            <TextAreaField
              name="additionalNotes"
              placeholder="Additional Notes"
              value={this.state.additionalNotes}
              onChange={this.onChange}
            />
            <Button name="rsvp-btn" value="Submit" />
          </form>
        </>}
        { this.state.hasSubmitted &&
        <>
          <div className="rsvp-submitted">Your response has been submitted</div>
          <div className="rsvp-tick">&#10004;</div>
        </>}
      </section>
    );
  }
}

const getFirstKey = (json) => {
  return Object.keys(json)[0];
};

export default RsvpPage;