import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../data.json'; // Adjust the path if necessary
import './ExpandedCard.css'; // Custom styling for the expanded view

const ExpandedCard = () => {
    const { id } = useParams();
    const opportunity = data[id];
    const navigate = useNavigate();

    if (!opportunity) {
        return <div>Opportunity not found</div>;
    }

    return (
        <div className="expanded-card">
            {/* Left Arrow Icon for Back */}
            <div className="back-icon" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l5.147 5.146a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
                </svg>
            </div>

            <h1>{opportunity["Opportunity Name"]}</h1>
            <p><strong>Organization:</strong> {opportunity.Organization}</p>
            <p><strong>Type:</strong> {opportunity.Type}</p>
            <p><strong>Prize Amount:</strong> {opportunity["Prize Amount"] || "$"}</p>
            <p><strong>Deadline:</strong> {opportunity["Deadline Month"] || "N/A"}</p>
            <p><strong>Description:</strong> {opportunity[""] || "UPDATE FROM DATABASE: blah blah asdkjflahsdlfkjhaslekjfnsdf"}</p>

        </div>
    );
};

export default ExpandedCard;
