import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Card from './Card';
import Header from './Header';
import './FakeCardContainer.css';
import Modal from './Modal';
import data from '../data.json'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
            <Header /> {/* Header remains at the top */}

            <div className="main-content">
                {/* Sidebar filter section */}
                <div className="filter-section">
                  <h3>Filter By:</h3>
                    <button onClick={() => openModal('fee')}>Application Fee
                      <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                    </button>
                    <button onClick={() => openModal('location')}>Location
                      <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                    </button>
                    <button onClick={() => openModal('location')}>Duration
                      <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                    </button>
                    <button onClick={() => openModal('location')}>Discipline
                      <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                    </button>
                    <button onClick={() => openModal('location')}>Deadline
                      <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                    </button>


                </div>

                {/* Card content section */}
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

            {/* Application Fee Modal */}
            <Modal
                isOpen={isModalOpen.fee}
                onClose={() => closeModal('fee')}
                title="Application Fee"
                options={["No fee", "Under $25", "$25-50", "Over $50", "Fee waiver available"]}
                onSubmit={handleFeeSubmit}
            />

            {/* Location Modal */}
            <Modal
                isOpen={isModalOpen.location}
                onClose={() => closeModal('location')}
                title="Location Options"
                options={["North America", "Europe", "Asia", "Africa", "Remote"]}
                onSubmit={handleLocationSubmit}
            />
        </div>
    );
};

export default FakeCardContainer;
