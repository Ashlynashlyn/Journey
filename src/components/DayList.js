import React, { useState } from 'react';

const DayEvent = ({ flexevent, onDelete }) => {
    return (
      <div className="flex-event">
        <img src="img/delete.png" alt="delete_icon" className="delete-icon" onClick={onDelete} />
        <h4>{flexevent.name}</h4>
        <p>{flexevent.description}</p>
      </div>
    );
};

  const DayItinerary = ({ itinerary, onDelete }) => {
    const itineraryClass = itinerary.id === 'completed' ? 'flex-itinerary completed' : 'flex-itinerary needs-attention';
  
    return (
      <div className={itineraryClass} id={itinerary.id}>
        <img src="img/delete.png" alt="delete_icon" className="delete-icon" onClick={onDelete} />
        <h4>{itinerary.name}</h4>
        <p>{itinerary.description}</p>
      </div>
    );
  };

const DayDefault = ({ initialFlexevents, initialFlexitineraries, dailyBudget, setDailyBudget, remainingBudget }) => {
    const remainingDayBudget = remainingBudget - dailyBudget;

    const handleBudgetChange = (event) => {
      const newDailyBudget = parseInt(event.target.value);
      setDailyBudget(newDailyBudget);
    };
    const [noteContent, setNoteContent] = useState('Click to add notes');
    const [editingNote, setEditingNote] = useState(false);
    const [flexeventsState, setFlexevents] = useState(initialFlexevents);
    const [flexitinerariesState, setFlexitineraries] = useState(initialFlexitineraries);
  
    const handleNoteClick = () => {
      setEditingNote(true);
    };
    const handleNoteChange = (event) => {
      setNoteContent(event.target.value);
    };
    const handleNoteBlur = () => {
      setEditingNote(false);
    };

    const deleteEvent = (indexToDelete) => {
      const updatedEvents = flexeventsState.filter((_, index) => index !== indexToDelete);
      setFlexevents(updatedEvents);
    }
    const deleteItinerary = (indexToDelete) => {
      const updatedItineraries = flexitinerariesState.filter((_, index) => index !== indexToDelete);
      setFlexitineraries(updatedItineraries);
    }

  return (
    <div className="flex-day">
      <div className="flex-items">
        <div className="flex-defaults">
        <div className="flex-notes text-wrap" onClick={handleNoteClick} onBlur={handleNoteBlur}>
            <h4>Notes</h4>
            {editingNote ? (
              <textarea
                value={noteContent}
                onChange={handleNoteChange}
                style={{ width: '100%', maxWidth: '100%', height: 'auto', resize: 'vertical' }}
              />
            ) : (
              <p>{noteContent}</p>
            )}
          </div>
          <div className="flex-budget">
            <h4>Budget</h4>
            <p>Daily Budget: $<input type="number" value={dailyBudget} onChange={handleBudgetChange} /></p>
            <p>Remaining Budget: ${remainingBudget}</p>
          </div>
        </div>
        {flexitinerariesState.map((itinerary, index) => (
          <DayItinerary key={index} itinerary={itinerary} onDelete={() => deleteItinerary(index)} />
        ))}

        {flexeventsState.map((flexevent, index) => (
            <DayEvent key={index} flexevent={flexevent} onDelete={() => deleteEvent(index)} />
        ))}
      </div>
    </div>
  );
};



const DayList = ({ dayNumber, flexevents, flexitineraries, dailyBudget, setDailyBudget, remainingBudget }) => {
  return (
    <div className="flex-day">
      <h3>Day {dayNumber}</h3>
      <DayDefault 
          initialFlexevents={flexevents} 
          initialFlexitineraries={flexitineraries} 
          dailyBudget={dailyBudget} 
          setDailyBudget={setDailyBudget}
          remainingBudget={remainingBudget}
      />
    </div>
  );
};

export default DayList;
