import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  if (!show) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={show.image.original}
          className="w-full object-cover h-96 rounded-lg shadow-2xl"
          alt={show.name}
        />
        <div>
          <h1 className="text-4xl uppercase font-serif font-bold">{show.name}</h1>
          <p className="py-6">
            <p className="text-gray-600">{show.summary}</p>
          </p>
          <Link to={`/booking/${id}`}>
            <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold py-2 px-4 rounded mt-4">
              Book Movie Ticket
            </button>
          </Link>
          <button
            className="bg-purple-400 text-white font-semibold py-2 px-4 rounded ml-3 mt-4"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
