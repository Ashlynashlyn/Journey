import React from 'react';
import { Nav } from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';


import Introduction from './components/Introduction';
import Input from './components/Input';
import Planner from './components/Planner';
import AddEvent from './components/AddEvent';

function App(props) {
  const [tripData, setTripData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 0,
});

const [plans, setPlans] = useState([]);

  const addPlan = (newPlan) => {
    setPlans([...plans, newPlan]);
  };

  const [events, setEvents] = useState([]);

  const addEvent = (DayNumber, EventName, Location, Description) => {
    const newEvent = {
      DayNumber: DayNumber,
      EventName: EventName,
      Location: Location,
      Description: Description
    }
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <Nav />

      {/* Define your routes using the Routes component */}
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/input" element={<Input setTripData={setTripData} addPlan={addPlan}/>} />
        <Route path="/planner" element={<Planner tripData={tripData} plans={plans} events={events} />} />
        <Route path="/addevent" element={<AddEvent addEvent={addEvent} />} />
      </Routes>
      <footer className="bg-light py-3 mt-5">
        <div className="container text-center">
          <p>&copy; 2023 Journemo. All rights reserved.</p>
          <p id="contact">
            Contact Us: <a href="mailto:info@journemo.com"><span className="material-icons"></span>info@journemo.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
