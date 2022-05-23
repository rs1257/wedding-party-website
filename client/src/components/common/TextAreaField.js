import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaField = ({
  label,
  name,
  placeholder,
  rows,
  value,
  error,
  info,
  onChange,
  disabled,
}) => {
  return (
    <div>
      <div className='textarea-container'>
        {label &&
        <label
        className="input-label"
        >{label}</label>
        }
        <textarea
          className={classnames("", { "is-invalid": error })}
          placeholder={placeholder}
          rows={rows}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        ></textarea>
        {info && <small>{info}</small>}
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  rows: PropTypes.string,
};

TextAreaField.defaultProps = {
  rows: "5",
};

export default TextAreaField;
