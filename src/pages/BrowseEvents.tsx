import { useState } from 'react';
import { useGetAllEventsQuery } from '../features/api/eventsApi';
import EventCard from '../components/EventsCard';
import { type Event } from '../types/types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // For click events

export const BrowseEvents = () => {
  const { data: events = [], isLoading, isError } = useGetAllEventsQuery('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('cards');

  const filteredEvents = events.filter((event: Event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? event.category === selectedCategory
      : true;

    const matchesVenue = selectedVenue
      ? String(event.venueId) === selectedVenue
      : true;

    return matchesSearch && matchesCategory && matchesVenue;
  });

  const uniqueCategories: string[] = Array.from(
    new Set(events.map((event: Event) => event.category))
  );

  const uniqueVenueIds: string[] = Array.from(
    new Set(events.map((event: Event) => event.venueId.toString()))
  );

  const calendarEvents = filteredEvents.map((event: Event) => ({
    id: event.eventId.toString(),
    title: event.title,
    date: event.date,
  }));

  return (
    <div className="bg-gray-700 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Events</h1>

      {/* View toggle */}
      <div className="flex gap-4 mb-4">
        <button
          className={`btn ${viewMode === 'cards' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setViewMode('cards')}
        >
          Card View
        </button>
        <button
          className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setViewMode('calendar')}
        >
          Calendar View
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="input input-bordered w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full md:w-1/4"
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
        >
          <option value="">All Venues</option>
          {uniqueVenueIds.map((venueId) => (
            <option key={venueId} value={venueId}>
              Venue {venueId}
            </option>
          ))}
        </select>
      </div>

      {/* Status Messages */}
      {isLoading && <p>Loading events...</p>}
      {isError && <p>Failed to load events.</p>}
      {!isLoading && filteredEvents.length === 0 && <p>No events found.</p>}

      {/* Render View */}
      {viewMode === 'cards' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event: Event) => (
            <EventCard key={event.eventId} event={event} />
          ))}
        </div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          height="auto"
        />
      )}
    </div>
  );
};
