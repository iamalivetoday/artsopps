import React from 'react';
import './Card.css';


const Card = ({ organization, opportunityName, type, prizeAmount, deadline, link }) => {
  return (
      <div className="card">
          <div className="card-header">
              <h3>{opportunityName}</h3>
              <span className="prize-amount">{prizeAmount}</span>
          </div>
          <div className="card-body">
              <p><strong>Organization:</strong> {organization}</p>
              <p><strong>Type:</strong> {type}</p>
              <p><strong>Deadline:</strong> {deadline}</p>
          </div>
          <div className="card-footer">
              <a href={link} target="_blank" rel="noopener noreferrer">Apply + Info</a>
          </div>
      </div>
  );
}

export default Card;