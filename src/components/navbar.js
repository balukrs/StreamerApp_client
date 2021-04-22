import React from "react";
import { Link } from "react-router-dom";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import GoogleAuth from "./googleauth";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between  p-2.5 gradient shadow relative w-full">
      <div className="flex items-center w-5/12 px-2">
        <Link to="/" className="text-xl text-sh">
          <OndemandVideoIcon fontSize="large" className="mr-2 text-red-600" />
          Streamer
        </Link>
      </div>
      <div className="flex items-center transform translate-y-0.5 px-2">
        <div>
          <Link
            to="/"
            className="mr-12 text-indigo-500 transform hover:text-indigo-900"
          >
            Streams
          </Link>
        </div>
        <div>
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
