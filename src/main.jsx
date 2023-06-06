import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ShowDetails from './Pages/ShowDetails/ShowDetails';
import BookedTicket from './Pages/BookedTicket/BookedTicket';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
  },
  {
    path: '/show/:id',
    element: <ShowDetails></ShowDetails>,
  },
  {
    path: '/bookedTicket',
    element: <BookedTicket></BookedTicket>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
