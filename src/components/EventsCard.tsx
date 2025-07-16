import type { FC } from 'react';

export type Event = {
  eventId: number;
  title: string;
  description: string;
  venueId: number;
  category: string;
  eventType?: string;
  accessLevel?: string;
  date: string;
  time: string;
  ticketPrice: string;
  ticketsTotal: number;
  ticketsSold: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  event: Event;
};

const getTypeBadgeColor = (type?: string): string => {
  switch (type) {
    case 'Online':
      return 'badge-info';
    case 'In-person':
      return 'badge-success';
    case 'Free':
      return 'badge-warning';
    case 'VIP':
      return 'badge-accent';
    default:
      return 'badge-secondary';
  }
};

const getAccessBadgeColor = (access?: string): string => {
  switch (access) {
    case 'VIP':
      return 'badge-error';
    case 'Free':
      return 'badge-success';
    case 'Standard':
      return 'badge-primary';
    default:
      return 'badge-outline';
  }
};

const EventCard: FC<Props> = ({ event }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      {/* Image */}
      <figure className="h-40 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">{event.title}</h2>

        {/* Event Type & Access Level Badges */}
        <div className="flex items-center gap-2 mt-1 mb-2">
          {event.eventType && (
            <span className={`badge ${getTypeBadgeColor(event.eventType)}`}>
              {event.eventType}
            </span>
          )}
          {event.accessLevel && (
            <span className={`badge ${getAccessBadgeColor(event.accessLevel)}`}>
              {event.accessLevel}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600">
          {new Date(event.date).toLocaleDateString()} at {event.time}
        </p>

        <p className="text-sm text-gray-600">
          Category: {event.category}
        </p>

        <p className="text-sm text-gray-600">
          Tickets: {event.ticketsSold}/{event.ticketsTotal}
        </p>

        <p className="text-sm text-gray-600 mb-2">{event.description}</p>

        <p className="text-sm text-gray-800 font-bold">
          KES {parseFloat(event.ticketPrice).toFixed(2)}
        </p>

        <div className="card-actions mt-3">
          <button className="btn btn-primary btn-sm w-full">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
