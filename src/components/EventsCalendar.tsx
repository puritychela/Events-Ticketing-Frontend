import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US'; 
import type { FC } from 'react';
import { type Event as CustomEvent } from '../types/types';
import '../styles/calendarStyles.css';


// ✅ Localizer config with ES module locale
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

type Props = {
  events: CustomEvent[];
};

export const EventsCalendar: FC<Props> = ({ events }) => {
  const calendarEvents = events.map((event) => ({
    title: event.title,
    start: new Date(`${event.date}T${event.time}`),
    end: new Date(`${event.date}T${event.time}`),
    allDay: false,
  }));

  return (
    <div className="bg-base-100 rounded p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Calendar View</h2>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="bg-white rounded"
      />
    </div>
  );
};
