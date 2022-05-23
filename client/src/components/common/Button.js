import React from "react";
import PropTypes from "prop-types";

const Button = ({
  name,
  type,
  value,
  onSubmit,
  onClick,
  disabled,
}) => {
  return (
    <div className='button-container'>
      <button
        className={type}
        name={name}
        onSubmit={onSubmit}
        onClick={onClick}
        disabled={disabled}
      >{value}</button>
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.string,
};

Button.defaultProps = {
  type: "primary",
};

export default Button;
