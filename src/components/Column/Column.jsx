import React from 'react';
import PropTypes from 'prop-types';

const Column = ({ children, columnClass }) => {
  return (
    <div className={columnClass}>
      {children}
    </div>
  )
}

Column.propTypes = {
  children: PropTypes.node.isRequired,
  columnClass: PropTypes.string.isRequired,
};

export default Column;