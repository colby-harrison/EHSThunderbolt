const Sidebar = () => {
  return (
    <aside className="w-full md:w-80 p-4 space-y-6 bg-white shadow-md rounded-lg">
      {/* Support Us Section */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold">Support Us</h2>
        <p className="text-sm text-gray-600 mt-2">
          Your contributions help keep Thunderbolt running!
        </p>
        <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Donate
        </button>
      </div>

      {/* Popular Posts Section */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold">Popular Posts</h2>
        <ul className="mt-2 space-y-2">
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Top Story 1
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Top Story 2
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Top Story 3
            </a>
          </li>
        </ul>
      </div>

      {/* Upcoming Events Section */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
        <ul className="mt-2 space-y-2">
          <li className="text-gray-700">Event 1 - March 10</li>
          <li className="text-gray-700">Event 2 - March 15</li>
          <li className="text-gray-700">Event 3 - March 20</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;