import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldInput from "../common/TextFieldInput";

class SimpleSettings extends Component {
  constructor() {
    super();
    this.state = {
      weddingDateTime: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }

    axios
      .get("/api/settings/list")
      .then((res) => {
        console.log(res.data);
        this.setState({ 
          weddingDateTime: res.data[0].value,
        });
      })
      .catch((err) => console.log(err));
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const { weddingDateTime } = this.state;

    axios
      .post("/api/settings/update", {
        "WeddingDateTime": weddingDateTime,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  render() {
    const { errors } = this.state;
    
    return (
      <div>
        <form noValidate onSubmit={this.onSubmit} className="settings">
          <h2>Settings</h2>
          <h3>Wedding Day and Time</h3>
          <TextFieldInput
            type="datetime-local"
            placeholder="weddingDateTime"
            name="weddingDateTime"
            value={this.state.weddingDateTime}
            error={errors.weddingDateTime}
            onChange={this.onChange}
          />
          <button>Save</button>
        </form>
      </div>
    );
  }
}

SimpleSettings.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { })(withRouter(SimpleSettings));;
