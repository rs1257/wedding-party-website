import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldInput = ({
  label,
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div>
      <div className='input-container'>
        {label &&
        <label
        className="input-label"
        >{label}</label>
        }
        <input
          type={type}
          className={classnames("", { "is-invalid": error })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        ></input>
        {info && <small>{info}</small>}
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextFieldInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

TextFieldInput.defaultProps = {
  type: 'text'
}

export default TextFieldInput;