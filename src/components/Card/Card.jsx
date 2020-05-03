import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ data }) => {
  return (
    <div className="hsp-card">
      {data.imageUrl && <img className="hsp-card-img" src={data.imageUrl} alt={data.name} />}
      <div className="hsp-card-content">
        {data.name && <h4 className="hsp-card-name">{data.name}</h4>}
        {data.text && <p>{data.text}</p>}
        <ul className="hsp-card-meta">
          {data.type && <li><strong>Type:</strong> {data.type}</li>}
          {data.set.name && <li><strong>Set Name:</strong> {data.set.name}</li>}
        </ul>
      </div>
    </div>  
  )
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Card;