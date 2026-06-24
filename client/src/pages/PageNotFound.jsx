import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Ghost } from "lucide-react"; // icon package

export default function NotFound() {
  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">

      <Ghost className="w-20 h-20 text-[#006db8] mb-4 animate-bounce" />

      <h1 className="text-6xl font-bold text-[#006db8]">404</h1>

      <p className="text-lg text-gray-700 mt-2 flex items-center gap-2 justify-center">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        Looks like this page went on a vacation 👀
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-[#006db9] text-white rounded-md hover:bg-[#006db9]"
      >
        Take Me Home
      </Link>
    </div>
    </>
  );
}
