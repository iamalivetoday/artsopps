import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FakeCardContainer from './components/FakeCardContainer';
import ExpandedCard from './components/ExpandedCard'; // Import the new ExpandedCard component

function App() {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<FakeCardContainer />} />
            <Route path="/card/:id" element={<ExpandedCard />} />
          </Routes>
        </Router>
    );
}

export default App;
