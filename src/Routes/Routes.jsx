import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Main from './../Layout/Main';
import {
    createBrowserRouter,
  } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "/login",
          element: <Login></Login>
        }
    ]
  },
]);
