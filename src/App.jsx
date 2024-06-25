import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";

///// pages /////

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login/Login";

import Layout from "./components/Layout/Layout";
// import ComingSoon from "./pages/NotFound/ComingSoon";
import NotFound from "./pages/NotFound/NotFound";
import Perfumes from "./pages/Perfumes/Perfumes";
import AddPerfume from "./pages/Perfumes/AddPerfume";
import UpdatePerfume from "./pages/Perfumes/UpdatePerfume";

import PerfumeNotes from "./pages/PerfumeNotes/PerfumeNotes";
import AddPerfumeNotes from "./pages/PerfumeNotes/AddPerfumeNotes";
import UpdatePerfumeNotes from "./pages/PerfumeNotes/UpdatePerfumeNotes";

// const isUserLoggedIn = localStorage.getItem('userAuth')
const isUserLoggedIn=true

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: isUserLoggedIn ? <Layout /> : <Navigate to="/login" />,

      children: [
        {
          path: "/",
          element: <Dashboard />,
        },

      
        {
          path: "/*",
          element: <NotFound />,
        },
        {
          path: "/perfumes",
          element: <Perfumes />,
        }, 
        {
          path: "/perfume/add",
          element: <AddPerfume />,
        },
        {
          path: "/perfume/update/:id",
          element: <UpdatePerfume />,
        },

        {
          path: "/perfumenotes",
          element: <PerfumeNotes />,
        }, 
        {
          path: "/perfumenotes/add",
          element: <AddPerfumeNotes />,
        },
        {
          path: "/perfumenotes/update/:id",
          element: <UpdatePerfumeNotes />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
  <div className=''><Toaster richColors
  containerClassName="overflow-auto"/>
  <RouterProvider router={router} />;
  </div>
  )
};

export default App;
