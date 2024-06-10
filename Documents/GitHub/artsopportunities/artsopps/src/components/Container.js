import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Card.css';
import data from '../data.json'; // Ensure this path is correct

const Container = () => {
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        setOpportunities(data);
    }, []);

    return (
        <div className="card-container">
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

export default Container;
