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
// import AddPerfume from "./pages/Perfumes/AddPerfume";

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
import AddNewArrival from "./pages/NewArrivalPerfume/AddNewArrival";
import UpdateNewArrival from "./pages/NewArrivalPerfume/UpdateNewArrival";
import NewArrival from "./pages/NewArrivalPerfume/NewArrival";
import MenPerfume from "./pages/MenPerfume/MenPerfume";
import AddMenPerfume from "./pages/MenPerfume/AddMenPerfume";
import UpdateMenPerfume from "./pages/MenPerfume/UpdateMenPerfume";
import WomenPerfume from "./pages/WomenPerfume.jsx/WomenPerfume";
import AddWomenPerfume from "./pages/WomenPerfume.jsx/AddWomenPerfume";
import UpdateWomenPerfume from "./pages/WomenPerfume.jsx/UpdateWomenPerfume";
import PerfumeCategory from "./pages/PerfumeCategory/PerfumeCategory";
import Fragram from "./pages/Fragrams/Fragram";
import CelebrityPerfume from "./pages/CelebrityPerfume/CelebrityPerfume";
import AddCelebrityPerfume from "./pages/CelebrityPerfume/AddCelebrityPerfume";
import UpdateCelebrityPerfume from "./pages/CelebrityPerfume/UpdateCelebrityPerfume";
import GlobalVideo from "./pages/GlobalVideo/GlobalVideo";
import AddGlobalVideo from "./pages/GlobalVideo/AddGlobalVideo";
import UpdateGlobalVideo from "./pages/GlobalVideo/UpdateGlobalVideo";
import GlobalBanner from "./pages/GlobalBanner/GlobalBanner";
import AddGlobalBanner from "./pages/GlobalBanner/AddGlobalBanner";
import UpdateGlobalBanner from "./pages/GlobalBanner/UpdateGlobalBanner";
import News from "./pages/News/News";
import AddNews from "./pages/News/AddNews";
import UpdateNews from "./pages/News/UpdateNews";
import SideBarReview from "./pages/SideBarReview/SideBarReview";
import WriteAReview from "./pages/WriteAReview/WriteAReview";
import ViewReview from "./pages/WriteAReview/ViewReview";
import RequestViewReview from "./pages/RequestAReview/RequestViewReview";
import RequestAReview from "./pages/RequestAReview/RequestAReview";
import AddCountryISO from "./pages/CountryISOCode/AddCountryISO";
import CountryISO from "./pages/CountryISOCode/CountryISO";
import SaleOff from "./pages/SaleOff/SaleOff";
import ContactUserDetail from "./pages/ContactUs/ContactUserDetail";
import ContactUserDataView from "./pages/ContactUs/ContactUserDataView";
import BrandImagesLinkPage from "./pages/BrandImagesLinkPage/BrandImagesLinkPage";
import AddBrandLinkPage from "./pages/BrandImagesLinkPage/AddBrandLinkPage";
import AddTempPerfume from "./pages/Perfumes/TempPerfume/AddPerfume";
import AddPerfume from "./pages/Perfumes/AddPerfume";
import NewsletterSubscribers from "./pages/newsLetter/NewsletterSubscribers";


const isUserLoggedIn = localStorage.getItem("isusrlgd");

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
          // element: <AddPerfume />,
          element: <AddPerfume />,
        },
        {
          path: "/perfume/tempadd",
          element: <AddTempPerfume />,

        },
        {
          path: "/perfume/update/:perfumeId",
          element: <UpdatePerfume />,
        },
        // Related Fragram
        {
          path: "perfume/relatedFragram/:perfumeId",
          element: <RelatedFragram

          />,
        },
        // Related Fragram

        // Perfume Category
        {
          path: "perfume/perfumeCategory/:perfumeId",
          element: <PerfumeCategory

          />,
        },
        // Perfume Category
        // fragram
        {
          path: "perfume/fragram/:perfumeId",
          element: <Fragram

          />,
        },
        // fragram

        // fragram
        {
          path: "perfume/sideBarReview/:perfumeId",
          element: <SideBarReview

          />,
        },
        // fragram



        {
          path: "/newArrival",
          element: <NewArrival />,
        },
        {
          path: "/newArrival/add",
          element: <AddNewArrival />,
        },
        {
          path: "/newArrival/update/:id",
          element: <UpdateNewArrival />,
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
        {
          path: "/menPerfume",
          element: <MenPerfume />,
        },
        {
          path: "/menPerfume/addMenPerfume",
          element: <AddMenPerfume />,
        },
        {
          path: "/menPerfume/editMenPerfume/:id",
          element: <UpdateMenPerfume />,
        },
        {
          path: "/womenPerfume",
          element: <WomenPerfume />,
        },
        {
          path: "/womenPerfume/addWomenPerfume",
          element: <AddWomenPerfume />,
        },
        {
          path: "/menPerfume/editMenPerfume/:id",
          element: <UpdateWomenPerfume />,
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

        // celebrity perfume
        {
          path: "/celebrityPerfume",
          element: <CelebrityPerfume />,
        },
        // add celebrity perfume
        {
          path: "/addCelebrityPerfume",
          element: <AddCelebrityPerfume />,
        },
        // update celebrity perfume
        {
          path: "/updateCelebrityPerfume/:celebrityPerfumeId",
          element: <UpdateCelebrityPerfume />,
        },
        // global video
        {
          path: "/globalVideo",
          element: <GlobalVideo />,
        },
        // add global video
        {
          path: "/addGlobalVideo",
          element: <AddGlobalVideo />,
        },
        // update global video
        {
          path: "/updateGlobalVideo/:globalVideoId",
          element: <UpdateGlobalVideo />,
        },

        //  global video
        {
          path: "/globalBanner",
          element: <GlobalBanner />,
        },
        //  add global video
        {
          path: "/addGlobalBanner",
          element: <AddGlobalBanner />,
        },
        //  update global video
        {
          path: "/updateGlobalBanner/:globalBannerId",
          element: <UpdateGlobalBanner />,
        },
        //  News
        {
          path: "/News",
          element: <News />,
        },
        // Add News
        {
          path: "/addNews",
          element: <AddNews />,
        },
        // Update  News
        {
          path: "/updateNews/:newsId",
          element: <UpdateNews />,
        },

        // Write A Review
        {
          path: "/writeAReview",
          element: <WriteAReview />,
        },
        {
          path: "/requestAReview",
          element: <RequestViewReview />,
        },
        {
          path: "/viewRequestReview/:id",
          element: <RequestAReview />,
        },
        {
          path: "/viewReview/:id",
          element: <ViewReview />,
        },

        //Country ISO Code
        {
          path: "/addCountryISO",
          element: <AddCountryISO />,
        },
        {
          path: "/countryISO",
          element: <CountryISO />,
        },
        // sale off
        {
          path: "/saleOff",
          element: <SaleOff />,
        },
        {
          path: "/sideBarReview",
          element: <SideBarReview />,
        },
        {
          path: "/contact-us",
          element: <ContactUserDetail />,
        },
        {
          path: "/contact-us/view/:id",
          element: <ContactUserDataView />
        },
        {
          path: "/brandImageLink",
          element: <BrandImagesLinkPage />
        },
        {
          path: "/addbrandImageLink",
          element: <AddBrandLinkPage />
        },
        {
          path: "/newsLetter",
          element: <NewsletterSubscribers />
        }
        // sale off




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
      <div className="">
        <Toaster richColors />
        <RouterProvider router={router} />;
      </div>
    </Provider>
  );
};

export default App;
