import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Card from './Card';
import Header from './Header';
import './FakeCardContainer.css';
import Modal from './Modal'; // Import the generalized modal
import data from '../data.json'; // Adjust the path if necessary

const FakeCardContainer = () => {
    const [opportunities, setOpportunities] = useState([]);
    const navigate = useNavigate(); // Create navigate function

    useEffect(() => {
        setOpportunities(data);
    }, []);

    const handleCardClick = (id) => {
        navigate(`/card/${id}`); // Navigate to the expanded card view
    };

    const [isModalOpen, setIsModalOpen] = useState({
        fee: false,
        location: false,
    });

    const [filters, setFilters] = useState({
        fee: [],
        location: [],
    });

    const openModal = (type) => {
        setIsModalOpen({ ...isModalOpen, [type]: true });
    };

    const closeModal = (type) => {
        setIsModalOpen({ ...isModalOpen, [type]: false });
    };

    const handleFeeSubmit = (selectedOptions) => {
        setFilters({ ...filters, fee: selectedOptions });
        closeModal('fee'); // Close the modal after submitting
        console.log("Selected Fee Options:", selectedOptions);
    };

    const handleLocationSubmit = (selectedOptions) => {
        setFilters({ ...filters, location: selectedOptions });
        closeModal('location'); // Close the modal after submitting
        console.log("Selected Location Options:", selectedOptions);
    };

    return (
        <div>
            <Header />
            <div className="controls">
                <button onClick={() => openModal('fee')}>Select Application Fee</button>
                <button onClick={() => openModal('location')}>Select Location</button>
            </div>

            {/* Application Fee Modal */}
            <Modal
                isOpen={isModalOpen.fee}
                onClose={() => closeModal('fee')}
                title="Select Application Fee Options"
                options={["No fee", "Under $25", "$25-50", "Over $50", "Fee waiver available"]}
                onSubmit={handleFeeSubmit}
            />

            {/* Location Modal */}
            <Modal
                isOpen={isModalOpen.location}
                onClose={() => closeModal('location')}
                title="Select Location Options"
                options={["North America", "Europe", "Asia", "Africa", "Remote"]}
                onSubmit={handleLocationSubmit}
            />

            <div className="fake-card-container">
                {opportunities.map((opportunity, index) => (
                    <div key={index} onClick={() => handleCardClick(index)}>
                        <Card
                            organization={opportunity.Organization}
                            opportunityName={opportunity["Opportunity Name"]}
                            type={opportunity.Type}
                            prizeAmount={opportunity["Prize Amount"] || "$"}
                            deadline={opportunity["Deadline Month"] || "N/A"}
                            link={opportunity.link || "#"}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FakeCardContainer;
