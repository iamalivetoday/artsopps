import React, { useState, useEffect } from 'react';
import Card from './Card';
import './FakeCardContainer.css';
import data from '../data.json'; // Adjust the path if necessary

const FakeCardContainer = () => {
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        setOpportunities(data);
    }, []);

    return (
        <div className="fake-card-container">
            {opportunities.map((opportunity, index) => (
                <Card
                    key={index}
                    organization={opportunity.Organization}
                    opportunityName={opportunity["Opportunity Name"]}
                    type={opportunity.Type}
                    prizeAmount={opportunity["Prize Amount"] || "N/A"}
                    deadline={opportunity["Deadline Month"] || "N/A"}
                    link={opportunity.link || "#"}
                />
            ))}
        </div>
    );
}

export default FakeCardContainer;
