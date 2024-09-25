import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, options, onSubmit }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(selectedOptions); // Pass the selected options to the onSubmit handler
        onClose(); // Close the dropdown after submission
    };

    if (!isOpen) return null; // Don't render the dropdown if it's not open

    return (
        <div className="dropdown-menu">
            <div className="dropdown-header">
                <h2 className="dropdown-title">{title}</h2>
            </div>
            <form onSubmit={handleSubmit}>
                {options.map((option, index) => (
                    <div key={index} className="dropdown-option">
                        <label>
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleOptionChange(option)}
                            />
                            {option}
                        </label>
                    </div>
                ))}
                <div className="dropdown-buttons">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Modal;
