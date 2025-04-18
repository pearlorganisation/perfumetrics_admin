import React from "react";
import { Link } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CategoryIcon from "@mui/icons-material/Category";

const Sidebar = () => {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0  "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <SpaceDashboardIcon />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </Link>
          </li>

          <li>
            <Link
              to="/perfumes"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">Perfumes</span>
            </Link>
          </li>


          <li>
            <Link
              to="/topRatedPerfume"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Top Rated Perfumes
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/newArrival"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                New Arrival Perfumes
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/perfumeBrands"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Perfume Brands
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/perfumenotes"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Perfume Notes
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/celebrityPerfume"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Celebrity Perfumes
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/globalBanner"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Global Banner
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/globalVideo"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Global Video
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                News
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/writeAReview"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Write a Review
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/requestAReview"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Request Reviews
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/countryISO"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                ISO CODES
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/saleOff"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Sale Off
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/sideBarReview"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Side Bar Review
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Contacts Details
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/brandImageLink"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Add Brand  Links
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/newsLetter"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <CategoryIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                News Letter
              </span>
            </Link>
          </li>







          <li>
            <Link
              to="/login"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
