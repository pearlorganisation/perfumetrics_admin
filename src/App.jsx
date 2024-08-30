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
import PerfumeBrands from "./pages/PerfumeBrands/PerfumeBrands";
import { Provider } from "react-redux";
import store from "./features/store";
import AddBrand from "./pages/PerfumeBrands/AddBrand";
import Users from "./pages/Users/Users";
import TopRatedPerfumes from "./pages/TopRatedPerfume/TopRatedPerfumes";
import AddTopRatedPerfume from "./pages/TopRatedPerfume/AddTopRatedPerfume";
import RelatedFragram from "./pages/RelatedFragram/RelatedFragram";
import AddRelatedFragram from "./pages/RelatedFragram/AddRelatedFragram";

const isUserLoggedIn = localStorage.getItem('isusrlgd')

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
          path: "/users",
          element: <Users />,
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

        //perfume brands
        {
          path: "/perfumeBrands",
          element: <PerfumeBrands />,
        },
        {
          path: "/addBrand",
          element: <AddBrand />,
        },
        {
          path: "/topRatedPerfume",
          element: <TopRatedPerfumes />,
        },
        {
          path: "/addTopRatedPerfume",
          element: <AddTopRatedPerfume />,
        },
        {
          path: "/relatedFragram",
          element: <RelatedFragram />,
        },
        {
          path: "/addRelatedFragram",
          element: <AddRelatedFragram />,
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
    <Provider store={store}>
      <div className=''>
        <Toaster richColors containerClassName="overflow-auto" />
        <RouterProvider router={router} />;
      </div>
    </Provider>
  )
};

export default App;
