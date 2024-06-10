import React from 'react';
import './FakeCardComponent.css';

const FakeCardComponent = () => {
    return (
        <div className="fake-card">
            <div className="fake-card-header">
                <h3>Fake Opportunity</h3>
                <span className="prize-amount">$10K</span>
            </div>
            <div className="fake-card-body">
                <p><strong>Organization:</strong> Fake Organization</p>
                <p><strong>Type:</strong> Grant</p>
                <p><strong>Deadline:</strong> January 1, 2025</p>
            </div>
            <div className="fake-card-footer">
                <a href="#" target="_blank" rel="noopener noreferrer">Apply + Info</a>
            </div>
        </div>
    );
}

export default FakeCardComponent;
