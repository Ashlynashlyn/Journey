import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { csv } from 'd3-fetch';

function Input(props) {
    const [destination, setDestination] = useState('');
    const [destinationData, setDestinationData] = useState([]);
    const [budget, setBudget] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const newPlan = { destination, startDate, endDate, budget };

    useEffect(() => {
      csv('/state-abbrevs.csv')
        .then((data) => {
          setDestinationData(data);
        })
        .catch((error) => {
          console.error('Error loading CSV file:', error);
        });
    }, []);

    const handleDestinationChange = (e) => {
      setDestination(e.target.value);
    };
    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
    };
    const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
    };
    const handleEndDateChange = (e) => {
      //setEndDate(e.target.value);
      const inputEndDate = e.target.value;
      setEndDate(inputEndDate);

      if (startDate && inputEndDate) {
          const startDateObj = new Date(startDate);
          const endDateObj = new Date(inputEndDate);
          if (endDateObj < startDateObj) {
              setEndDateError("End date cannot be earlier than start date");
          } else {
              setEndDateError("");
          }
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!endDateError) {
        props.setTripData({destination,startDate, endDate, budget});
        props.addPlan({ destination, startDate, endDate, budget });
        setFormSubmitted(true);
      }
    };


  
  return (
    <div>
      {/* Navigation bar */}

      <main className="container mt-4 bg-image">
        {/* Page title */}
        <h1>Start a New Trip</h1>

        {/* The container including all the chunks that users will input values */}
        <form onSubmit={handleSubmit}>
          {/* Input1: Destination */}
          <div className="mb-3">
            <label htmlFor="destination" className="form-label">Destination:</label>
            <select className="form-control" id="destination" name="destination" value={destination} onChange={handleDestinationChange}>
            <option value="">Select a state</option>
              {destinationData.map((stateData) => (
                <option key={stateData.state} value={stateData.state}> {stateData.state} </option>
            ))}
          </select>
          </div>

          <div className="row">
            {/* Input2: Start Day */}
            <div className="col-md-6 mb-3">
              <label htmlFor="start-date" className="form-label">Start date:</label>
              <input type="date" className="form-control" id="start-date" name="startDate" value={startDate} onChange={handleStartDateChange} required/>
            </div>

            {/* Input3: End Day */}
            <div className="col-md-6 mb-3">
              <label htmlFor="end-date" className="form-label">End date:</label>
              <input type="date" className="form-control" id="end-date" name="endDate" value={endDate} onChange={handleEndDateChange} required/>
              {endDateError && <p className="text-danger">{endDateError}</p>}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="budget" className="form-label">Budget:</label>
            <input type="number" className="form-control" id="budget" name="budget" min="0" value={budget} onChange={handleBudgetChange}/>
          </div>

          <button type="submit" className="btn btn-primary">Confirm your information before starting the trip</button>

        </form>
        {endDateError && (
        <p className="text-danger">Please correct the errors before starting the trip!</p>
        )}
        {formSubmitted ? (
          <Link to="/planner" className="btn btn-primary">Start the trip</Link>
        ) : (
          <p>Please confirm your information before starting the trip.</p>
        )}
      </main>
    </div>
  );
}

export default Input;
