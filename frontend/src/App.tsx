import React, {Fragment}  from 'react';
import './App.css';
import {RequireAuth} from "react-auth-kit";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./layouts/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      { path: "/", element: <Home /> }
    ]
  }
]);

const App = () => {
  return (
      <RouterProvider router={router}/>
  );
};

export default App;
