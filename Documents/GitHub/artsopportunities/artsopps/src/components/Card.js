import React from 'react';
import './Card.css';


const Card = ({ organization, opportunityName, type, prizeAmount, deadline, link }) => {
  return (
      <div className="card">
          <div className="card-header">
              <h3>{organization}</h3>
              <span className="prize-amount">{prizeAmount}</span>
          </div>
          <div className="card-body">
              <p>{opportunityName}</p>
              <p><strong>Deadline:</strong> {deadline}</p>
              <p><strong>Amount:</strong> {type}</p>
          </div>
      </div>
  );
}

export default Card;