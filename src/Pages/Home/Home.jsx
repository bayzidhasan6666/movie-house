import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [showAllData, setShowAllData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const redirectToDetails = (id) => {
    navigate(`/show/${id}`);
  };

  const toggleShowAllData = () => {
    setShowAllData(!showAllData);
  };

  const getButtonText = () => {
    return showAllData ? 'See Less' : 'See More';
  };

  const sortedShows = shows.sort((a, b) => {
    const nameA = a.show.name.toLowerCase();
    const nameB = b.show.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const visibleShows = showAllData ? sortedShows : sortedShows.slice(0, 6);

  return (
    <div className="container mx-auto py-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleShows.map((show) => (
          <li
            key={show.show.id}
            className="bg-white rounded shadow p-6 flex flex-col justify-between"
          >
            <div>
              <img
                className="h-64 w-full object-cover"
                src={show.show.image.original}
                alt=""
              />
              <h2 className="text-xl font-bold mb-2">{show.show.name}</h2>
            </div>
            <div className="mt-4">
              <button
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold py-2 px-4 rounded"
                onClick={() => redirectToDetails(show.show.id)}
              >
                Show Details
              </button>
            </div>
          </li>
        ))}
      </ul>
      {shows.length > 6 && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold py-2 px-4 rounded"
            onClick={toggleShowAllData}
          >
            {getButtonText()}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
