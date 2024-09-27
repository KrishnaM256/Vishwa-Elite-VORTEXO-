import React from 'react';
import Card from './Card';

const events = [
  {
    id: 1,
    title: 'Event 1',
    startTime: '2024-09-28T10:00:00',
    endTime: '2024-09-28T12:00:00',
    description: 'Description for Event 1.',
  },
  {
    id: 2,
    title: 'Event 2',
    startTime: '2024-09-29T14:00:00',
    endTime: '2024-09-29T16:00:00',
    description: 'Description for Event 2.',
  },
  // Add more events as needed
];

function Left({ setSelectedEvent }) {
  return (
    <div
      style={{
        width: '40%',
        height: '90vh',
        padding: '10px',
        overflowY: 'auto',
        border: '1px solid #ccc',
      }}
    >
      {events.map(event => (
        <Card
          key={event.id}
          event={event}
          onClick={() => setSelectedEvent(event)} // Set selected event on click
        />
      ))}
    </div>
  );
}

export default Left;
