import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, msg }) => {
  return (
    <div className={type}>{msg}</div>
  )
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
};

export default Alert;