import React from "react";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-5xl font-bold">404</h1>
        <span>Page Not Found</span>
        <Link to={'/'} className="text-indigo-200 px-10 py-1 rounded border mt-3 bg-indigo-800">Home</Link>
    </div>
  );
}

export default Error404;
