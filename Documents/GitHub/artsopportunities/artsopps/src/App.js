import React from 'react';
import './App.css';
import data from './data.json'; // Ensure your JSON file is correctly formatted and located in src

function App() {
  return (
    <div className="App">

      <main>
        <table>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Opportunity</th>
              <th>Type</th>
              <th>Sub-Type</th>
              <th>Discipline</th>
              <th>Sub-Discipline</th>
              <th>Eligibility</th>
              <th>Sub-Eligibility</th>
              <th>Deadline Month</th>
              <th>Location</th>
              <th>Country</th>
              <th>Where Outside</th>
              <th>Duration</th>
              <th>Application Fee</th>
              <th>Fee Waiver Available</th>
              <th>Accessible</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.Organization}</td>
                <td>{item.Opportunity}</td>
                <td>{item.Type}</td>
                <td>{item['Sub-Type']}</td>
                <td>{item.Discipline}</td>
                <td>{item['Sub-Discipline']}</td>
                <td>{item.Eligibility}</td>
                <td>{item['Sub-Eligibility']}</td>
                <td>{item['Deadline Month']}</td>
                <td>{item.Location}</td>
                <td>{item.Country}</td>
                <td>{item['Where Outside']}</td>
                <td>{item.Duration}</td>
                <td>{item['Application Fee']}</td>
                <td>{item['Fee Waiver Available']}</td>
                <td>{item.Accessible}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
