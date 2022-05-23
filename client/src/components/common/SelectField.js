import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  name,
  value,
  info,
  type,
  options,
  onChange,
  disabled,
}) => {
  return (
    <div>
      <div className='select-container'>
        {label &&
        <label
        className="input-label"
        >{label}</label>
        }
        <select
          type={type}
          name={name}
          value={value ? value : options[0]}
          onChange={onChange}
          disabled={disabled}
        >
          {Object.keys(options).map((option, index) => {
            return <option key={index} value={option}>{options[option]}</option>;
          })}
        </select>
        {info && <small>{info}</small>}
      </div>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default SelectField;
