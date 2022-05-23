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
      starter: '',
      main: '',
      dessert: '',
      additionalNotes: '',
      menu: { starter: [], main: [], dessert: []}, // don't think this was ever working!!! need to make it either an array or a object
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
    .post('/api/settings/getMultiple', { name: 'Starter, Main, Dessert' })
    .then((res) => {
      if (res.data) {
        const menu = this.state.menu;
        menu.starter = res.data[0].value.split('\n');
        menu.main = res.data[1].value.split('\n');
        menu.dessert = res.data[2].value.split('\n');
        this.setState({ menu });
      }
    })
    .catch((err) => console.log(err));
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    axios
      .post("/api/rsvp/respond", this.state)
      .then((res) => {})
      .catch((err) => {
        this.setState({errors: err.response.data});
      });

  }

  render() {
    const { errors } = this.state;

    return (
      <section id="rsvppage">
        <form noValidate onSubmit={this.onSubmit} className="rsvp">
          <h1>RSVP</h1>
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
          {this.state.canAttend === "yes" && (
            <>
              <SelectField
                label="Starter Choice"
                name="starter"
                value={this.state.starter}
                options={this.state.menu.starter}
                onChange={this.onChange}
              />
              <SelectField
                label="Main Choice"
                name="main"
                value={this.state.main}
                options={this.state.menu.main}
                onChange={this.onChange}
              />
              <SelectField
                label="Dessert Choice"
                name="dessert"
                value={this.state.dessert}
                options={this.state.menu.dessert}
                onChange={this.onChange}
              />
            </>
          )}
          <TextAreaField
            name="additionalNotes"
            placeholder="Additional Notes"
            value={this.state.additionalNotes}
            onChange={this.onChange}
          />
          <Button name="rsvp-btn" value="Submit" />
        </form>
      </section>
    );
  }
}

const getFirstKey = (json) => {
  return Object.keys(json)[0];
};

export default RsvpPage;