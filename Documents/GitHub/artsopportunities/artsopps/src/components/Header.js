import React from 'react';
import './Header.css'; // Optional CSS for the header

const Header = () => {
    return (
        <header className="header">
            <h1 className="title">Opportunity Explorer</h1>
            <nav className="navbar">
                <ul>
                    <li><a href="#about">add</a></li>
                    <li><a href="#contact"></a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
