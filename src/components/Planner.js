import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DayList from './DayList';

function Planner(props) {
    const { destination, startDate, endDate, budget } = props.tripData || {};
    const [planDeleted, setPlanDeleted] = useState(false);

    const deletePlan = () => {
        if (window.confirm("Are you sure you want to delete this plan?")) {
            setPlanDeleted(true);
        }
    };

    const [duration, setDuration] = useState(3);
    const [dayNumbers, setDayNumbers] = useState(Array.from({ length: duration }, (_, index) => index + 1));

    useEffect(() => {
        if (startDate && endDate) {
            const startDateCal = new Date(startDate);
            const endDateCal = new Date(endDate);
            const timeDifference = endDateCal - startDateCal;
            const inputDuration = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    
            setDuration(inputDuration);
            setDayNumbers(Array.from({ length: inputDuration }, (_, index) => index + 1));
        }
    }, [startDate, endDate]);

    const initialBudget = budget;
    const [remainingBudget, setRemainingBudget] = useState(initialBudget);
    const [dailyBudgets, setDailyBudgets] = useState(Array(duration).fill(0));

    const handleDailyBudgetChange = (dayIndex, newDailyBudget) => {
        const updatedDailyBudgets = [...dailyBudgets];
        updatedDailyBudgets[dayIndex] = newDailyBudget;
        setDailyBudgets(updatedDailyBudgets);

        const updatedRemainingBudget = initialBudget - updatedDailyBudgets.reduce((total, budget) => total + budget, 0);
        setRemainingBudget(updatedRemainingBudget);
    };

    const eventsForDay3 = [
        { name: "Event 1", description: "Description for Event 1" },
        { name: "Event 2", description: "Description for Event 2" },
    ];
    const itinerariesForDay3 = [
        { id: 'completed', name: 'Completed Itinerary', description: 'Completed itinerary description.', location: 'Some location' },
        { id: 'needs_attention', name: 'Itinerary Needs Attention', description: '', location: '' },
    ];
    const updatedItineraries = itinerariesForDay3.map((itinerary) => {
        const isCompleted = itinerary.description || itinerary.location;
        const description = isCompleted ? itinerary.description : "You haven't planned this itinerary yet!";
        return {
            ...itinerary,
            id: isCompleted ? 'completed' : 'needs_attention',
            description: description,
        };
    });

    return (
        <div>
            {!planDeleted ? (
                <>
                    <main>
                        <div className="containerIndex">
                            <div className="sidebar">
                                <div className="flex-item">
                                    <img src="img/menu.png" alt="menu_icon" id="menu" />
                                    <h2>Choose Plan</h2>
                                </div>
                                {props.plans.map((plan, index) => (
                                    <div key={index} className="flex-item">
                                    <Link to={`/planner/${plan.destination}`}>
                                        <img src="img/travel-bag.png" alt="plan_icon" />
                                        <span>{plan.destination || 'Start your First Plan'}</span>
                                    </Link>
                                    </div>
                                ))}
                               
                                <div className="flex-item">
                                    <Link to="/input">
                                        <img src="img/add.png" alt="add_icon" />
                                        <span>Add New Plan</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="mainbar">
                                <Link to="/addevent" className="add-event">
                                    <span>Add Event</span>
                                </Link>

                                <div className="plan_header">
                                    <h2 className="plan_name">{destination}</h2>
                                    <img src="img/delete.png" alt="delete_icon" className="delete-icon" onClick={deletePlan} />
                                </div>

                                {dayNumbers.map((dayNumber, index) => (
                                    <DayList 
                                        key={dayNumber} 
                                        dayNumber={dayNumber} 
                                        flexevents={eventsForDay3} 
                                        flexitineraries={updatedItineraries} 
                                        dailyBudget={dailyBudgets[index]}
                                        setDailyBudget={(newDailyBudget) => handleDailyBudgetChange(index, newDailyBudget)}
                                        remainingBudget={remainingBudget}
                                    />
                                ))}
                            </div>
                        </div>
                    </main>
                </>
            ) : (
                <div className="plan-deleted-message">
                    The plan has been deleted.
                </div>
            )}
        </div>
    );
}

export default Planner;
