import React, {Fragment}  from 'react';
import './App.css';
import {RequireAuth} from "react-auth-kit";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./layouts/pages/Home";
import ListingPage from "./layouts/pages/listing/ListingPage";
import Trips from "./layouts/pages/trips/Trips";
import ReservationsPage from "./layouts/pages/reservations/ReservationsPage";
import FavouritePage from "./layouts/pages/favourites/FavouritePage";
import PropertiesPage from "./layouts/pages/properties/PropertiesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/listings/:id", element: <ListingPage /> },
      { path: '/trips', element: (
            <RequireAuth loginPath="/">
              <Fragment>
                <Trips />
              </Fragment>
            </RequireAuth>
        ) },
      { path: '/reservations', element: (
            <RequireAuth loginPath="/">
              <Fragment>
                <ReservationsPage />
              </Fragment>
            </RequireAuth>
        ) },
        { path: '/favourites', element: (
                <RequireAuth loginPath="/">
                    <Fragment>
                        <FavouritePage />
                    </Fragment>
                </RequireAuth>
            ) },
        { path: '/properties', element: (
                <RequireAuth loginPath="/">
                    <Fragment>
                        <PropertiesPage />
                    </Fragment>
                </RequireAuth>
            ) },
    ]
  }
]);

const App = () => {
  return (
      <RouterProvider router={router}/>
  );
};

export default App;
