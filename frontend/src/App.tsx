import React, {Fragment}  from 'react';
import './App.css';
import {RequireAuth} from "react-auth-kit";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./layouts/pages/Home";
import ListingPage from "./layouts/pages/ListingPage";
import Trips from "./layouts/pages/Trips";

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
    ]
  }
]);

const App = () => {
  return (
      <RouterProvider router={router}/>
  );
};

export default App;
