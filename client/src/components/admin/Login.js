import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import TextFieldInput from '../common/TextFieldInput';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    
    this.props.loginUser(user);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form noValidate onSubmit={this.onSubmit} className="login">
          <h2>Login</h2>
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
          <button>Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
