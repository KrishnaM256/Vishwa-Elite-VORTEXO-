import React from 'react';
import Card from './Card';

function Right({ selectedEvent }) {
  return (
    <div style={{ width: '60%', padding: '10px' }}>
      {selectedEvent ? (
        <Card event={selectedEvent} /> // Show the selected event
      ) : (
        <p>No event selected. Click on an event to view details.</p> // Message when no event is selected
      )}
    </div>
  );
}

export default Right;
