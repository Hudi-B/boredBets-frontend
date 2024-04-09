import React from 'react';
import Countdown from 'react-countdown';

export default function countDown(date) {
  return (
    <Countdown
      date={date}
      renderer={({ days, hours, minutes, seconds }) => (
        <div>
          Time left: {days > 0 ? `${days} days ` : ''}
          {hours}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      )}
    />
  );
}