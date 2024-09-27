import React from 'react';

// Define default values for the props
const defaultProps = {
  event: {
    title: 'Default Event Title',
    startTime: new Date().toLocaleString(),
    endTime: new Date(new Date().getTime() + 3600000).toLocaleString(), // 1 hour later
    description: 'This is a default description for the event.',
  },
};

function Card({ event = defaultProps.event, onClick }) {
  const { title, startTime, description } = event;

  // Format the date to display only the date part
  const formattedDate = new Date(startTime).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="card card-side bg-base-100 shadow-xl mt-2" onClick={onClick}> {/* Call onClick when clicked */}
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt={title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Date: {formattedDate}</p>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">View Details</button>
        </div>
      </div>
    </div>
  );
}

// Assign default props
Card.defaultProps = defaultProps;

export default Card;
