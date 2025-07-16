const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white  mt-auto p-10">
      <div className="flex flex-col md:flex-row justify-between gap-10 w-full max-w-6xl mx-auto">
        {/* Left Section */}
        <div>
          <span className="text-lg font-bold mb-3 block text-blue-500">
            🎫 QuickBook Events
          </span>
          <a className="block hover:text-blue transition">About</a>
          <a className="block hover:text-blue transition">Contact</a>
          <a className="block hover:text-blue transition">Support</a>
        </div>

        {/* Right Section */}
        <div>
          <span className="text-lg font-bold mb-3 block text-blue-500">
            Legal
          </span>
          <a className="block hover:text-blue transition">Terms of Use</a>
          <a className="block hover:text-blue transition">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



