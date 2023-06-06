import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const BookedTicket = () => {
  const [bookedMovies, setBookedMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const movies = localStorage.getItem('bookedMovies');
    if (movies) {
      setBookedMovies(JSON.parse(movies));
    }
  }, []);

  if (bookedMovies.length === 0) {
    return (
      <h1 className="text-2xl text-center mt-20 font-bold mb-4">
        No Movie Ticket Booked
      </h1>
    );
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-2xl text-center mt-20 font-bold mb-4">
        Booked Movie Tickets
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
        {bookedMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-lg p-6 mx-4 mb-4"
          >
            <div className="flex items-center mb-4">
              <img
                src={movie.image.original}
                alt={movie.name}
                className="w-24 h-32 mr-4 rounded-lg"
              />
              <div>
                <h2 className="text-xl font-bold">{movie.name}</h2>
                <table className="mt-2">
                  <tbody>
                    <tr>
                      <th className="pr-2">Language:</th>
                      <td>{movie.language}</td>
                    </tr>
                    <tr>
                      <th className="pr-2">Premiered:</th>
                      <td>{movie.premiered}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={goBack}
        className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold py-2 px-4 mx-auto flex my-5 rounded"
      >
        Go Back
      </button>
    </>
  );
};

export default BookedTicket;
