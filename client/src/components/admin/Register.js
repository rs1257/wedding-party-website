import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldInput from '../common/TextFieldInput';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      secret: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      secret: this.state.secret
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form noValidate onSubmit={this.onSubmit} className="register">
          <h2>Register</h2>
          <TextFieldInput
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            error={errors.name}
            onChange={this.onChange}
          />
          <TextFieldInput
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            error={errors.email}
            onChange={this.onChange}
          />
          <TextFieldInput
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            error={errors.password}
            onChange={this.onChange}
          />
          <TextFieldInput
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={this.state.password2}
            error={errors.password2}
            onChange={this.onChange}
          />
          <TextFieldInput
            type="text"
            placeholder="Secret"
            name="secret"
            value={this.state.secret}
            error={errors.secret}
            onChange={this.onChange}
          />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));