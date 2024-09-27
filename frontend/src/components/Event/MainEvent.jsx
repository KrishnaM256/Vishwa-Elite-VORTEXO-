import React, { useState } from 'react';
import Right from './Right';
import Left from './Left';

function MainEvent() {
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold the selected event

  return (
    <div className='flex' style={{ width: '100%', display: 'flex' }}>
      <Left setSelectedEvent={setSelectedEvent} /> {/* Pass setSelectedEvent to Left */}
      <Right selectedEvent={selectedEvent} /> {/* Pass selectedEvent to Right */}
    </div>
  );
}

export default MainEvent;
