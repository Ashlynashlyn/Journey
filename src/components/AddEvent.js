import { React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

// Main AddEventForm Component
function AddEventForm(props) {
  const [dayNumber, setDayNumber] = useState('');
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isLinkEnabled, setIsLinkEnabled] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);


  const handleDayNumberChange = (e) => {
    setDayNumber(e.target.value);
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dayNumber && eventName && location && description) {
      props.addEvent(dayNumber, eventName, location, description);
      setIsLinkEnabled(false);
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  useEffect(() => {
    if (dayNumber && eventName && location && description) {
      setIsLinkEnabled(true);
    } else {
      setIsLinkEnabled(false);
    }
  }, [dayNumber, eventName, location, description]);
 
  return (
    <div>
      <main className="container mt-4 bg-sky">
        <h1>Add a New Event!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="dayNumber" className="form-label">Event Number:</label>
            <input type="number" className="form-control" id="dayNumber" name="dayNumber" placeholder="Type a day number" onChange={handleDayNumberChange} required></input>
          </div>

          <div className="mb-3">
            <label htmlFor="eventName" className="form-label">Event Name:</label>
            <textarea className="form-control" id="eventName" name="eventName" onChange={handleEventNameChange} required></textarea>
          </div>
        
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location:</label>
            <textarea className="form-control" id="location" name="location" onChange={handleLocationChange} required></textarea>
          </div>
          
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea className="form-control" id="description" name="description" onChange={handleDescriptionChange} required></textarea>
          </div>
          
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="itinerary" name="itinerary" />
            <label className="form-check-label" htmlFor="itinerary">Is It An Itinerary?</label>
          </div>

          {showErrorMessage && <p style={{ color: 'red' }}>Please fill out all the blanks.</p>}

          {isLinkEnabled ? (
            <Link to="/Planner">
              <button type="submit" className="btn btn-primary">
                Add Event
              </button>
            </Link>
          ) : (
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">
              Add Event
            </button>
          )}
        </form>
        
      </main>
    </div>
  );
}

export default AddEventForm;