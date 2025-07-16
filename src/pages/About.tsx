// import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import decoImage from '../assets/about.jpg' 
import bgImage from '../assets/about-1.jpeg' 

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
  

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row max-w-full">
        {/* Left: Text with Background Image */}
        <div
          className="relative w-full md:w-1/2 px-6 py-12 flex flex-col justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/40"></div>

          {/* Text content */}
          <div className="relative z-10 max-w-3xl mx-auto text-gray-900">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              About QuickBook Events
            </h1>

            <p className="text-lg font-medium mb-6">
              Your trusted platform for booking and managing event tickets with ease, security, and convenience.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-blue-800 mb-2">🎯 Our Mission</h2>
                <p>
                  To make event discovery and ticket booking seamless for everyone — whether it’s a concert, workshop, or tech conference.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-blue-800 mb-2">💡 Why Choose Us?</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Simple interface for browsing events</li>
                  <li>Secure payments via Stripe</li>
                  <li>Live ticket availability</li>
                  <li>Admin dashboard for organizers</li>
                  <li>Reliable customer support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-blue-800 mb-2">🌍 Our Vision</h2>
                <p>
                  To be Africa’s leading digital platform for event ticketing — bringing trust and convenience to event-goers and organizers.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Right: Decorative Image */}
        <div className="hidden md:block md:w-1/2 h-full">
          <img
            src={decoImage}
            alt="About Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default About
