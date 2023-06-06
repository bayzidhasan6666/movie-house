import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  const [bookedMovies, setBookedMovies] = useState([]);

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

  useEffect(() => {
    const movies = localStorage.getItem('bookedMovies');
    if (movies) {
      setBookedMovies(JSON.parse(movies));
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const bookMovieTicket = () => {
    const isAlreadyBooked = bookedMovies.some((movie) => movie.id === show.id);

    if (isAlreadyBooked) {
      Swal.fire({
        icon: 'warning',
        title: 'Movie Already Booked',
        text: 'You have already booked this movie.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
    } else {
      const updatedMovies = [...bookedMovies, show];
      setBookedMovies(updatedMovies);
      localStorage.setItem('bookedMovies', JSON.stringify(updatedMovies));
      Swal.fire({
        icon: 'success',
        title: 'Movie Booked',
        text: 'Your movie ticket has been booked.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
    }
  };

  if (!show) {
    return (
      <progress className="progress bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-56 mx-auto flex mt-20"></progress>
    );
  }

  return (
    <>
      {' '}
      <Navbar></Navbar>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={show.image.original}
            className="w-full object-cover h-96 rounded-lg shadow-2xl"
            alt={show.name}
          />
          <div>
            <h1 className="text-4xl uppercase font-serif font-bold">
              {show.name}
            </h1>
            <p className="py-2">
              <p className="text-gray-600">{show.summary}</p>
            </p>
            <div className="flex gap-6">
              <p>Language: {show.language}</p>
              <p>Premiered: {show.premiered}</p>
            </div>
            <button
              className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold py-2 px-4 rounded mt-4"
              onClick={bookMovieTicket}
            >
              Book Movie Ticket
            </button>
            <button
              className="bg-purple-400 text-white font-semibold py-2 px-4 rounded ml-3 mt-4"
              onClick={goBack}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowDetails;
