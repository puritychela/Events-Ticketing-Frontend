import { MdStar } from "react-icons/md";
import { CgCalendar } from "react-icons/cg";

interface FeaturedEventsProps {
  searchQuery: string;
}

const events = [
  {
    id: 1,
    title: "Live Concert Nairobi",
    date: "2025-08-10",
    location: "KICC Grounds",
    image: "/assets/event2.webp",
    badge: "Popular",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    date: "2025-08-20",
    location: "Safari Park Hotel",
    image: "/assets/event1.webp",
    badge: "Premium",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Art & Culture Expo",
    date: "2025-09-05",
    location: "GoDown Arts Centre",
    image: "/assets/event5.webp",
    badge: "Special",
    rating: 4.2,
  },
  {
    id: 4,
    title: "Nairobi Food Festival",
    date: "2025-07-15",
    location: "Kasarani Stadium",
    image: "/assets/event3.jpg",
    badge: "Chef's Special",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Startup Pitch Night",
    date: "2025-11-01",
    location: "iHub Nairobi",
    image: "/assets/event6.webp",
    badge: "Healthy",
    rating: 4.4,
  },
  {
    id: 6,
    title: "Music & Dance Fiesta",
    date: "2025-12-25",
    location: "Carnivore Grounds",
    image: "/assets/event4.jpg",
    badge: "Premium",
    rating: 4.9,
  },
];

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Popular":
      return "badge-warning";
    case "Premium":
      return "badge-accent";
    case "Special":
      return "badge-info";
    case "Chef's Special":
      return "badge-error";
    case "Healthy":
      return "badge-success";
    default:
      return "badge-primary";
  }
};

const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ searchQuery }) => {
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 bg-gray-700 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">Featured Events</h2>
        </div>

        {filteredEvents.length === 0 ? (
          <p className="text-center text-white text-lg">No events found.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                {/* Image and Badges */}
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`badge ${getBadgeColor(event.badge)} badge-lg text-white font-semibold`}>
                      {event.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <MdStar className="text-yellow-400 text-sm" />
                    <span className="text-sm font-semibold text-gray-700">{event.rating}</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <CgCalendar />
                    {event.date} @ {event.location}
                  </p>
                  <button className="btn w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-none hover:scale-105 transition-all duration-200">
                    View Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;
