import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full top-0 left-0 z-50 bg-gradient-to-r from-white to-blue-50 shadow-sm fixed">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Xchange
          </span>
        </Link>
        <div className="flex space-x-8">
          <Link
            to="/converter"
            className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive("/converter")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            Convertisseur
          </Link>
          <Link
            to="/exchange-rates"
            className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive("/exchange-rates")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            Taux de Change
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/*
    <nav className="w-full top-0 left-0 z-50 bg-white shadow-sm fixed">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Xchange
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-8">
            <Link
              to="/converter"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/converter")
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Convertisseur
            </Link>
            <Link
              to="/exchange-rates"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/exchange-rates")
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Taux de Change
            </Link>
          </div>
*/
