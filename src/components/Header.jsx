import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIservice } from "../services";

const Header = () => {
  const [apiStatus, setApiStatus] = useState("checking"); // 'checking', 'up', 'down', 'waking'

  useEffect(() => {
    checkApi();
  }, []);

  async function checkApi() {
    setApiStatus("checking");
    try {
      await APIservice.get(`/ping`);

      setApiStatus("up");
    } catch {
      setApiStatus("down");
    }
  }

  async function wakeApi() {
    setApiStatus("waking");
    try {
      await APIservice.get(`/ping`);

      setApiStatus("up");
    } catch {
      setApiStatus("down");
    }
  }

  return (
    <header className="flex items-center justify-between py-2 px-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="select-none flex flex-col leading-tight border-r border-gray-200 pr-4"
        >
          <span className="text-lg font-extrabold tracking-tight text-gray-900 flex items-center gap-1">
            <span className="text-green-400">#</span>n
            <span className="text-blue-400">@</span>
          </span>
          <span className="text-xs text-gray-400 font-medium">
            hashtags & mentions
          </span>
        </Link>
        {/* API Status Indicator */}
        <div className="flex items-center gap-2">
          {apiStatus === "up" && (
            <span className="flex items-center text-green-600 text-xs font-semibold bg-green-100 px-2 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              API Available
            </span>
          )}
          {apiStatus === "checking" && (
            <span className="flex items-center text-gray-500 text-xs font-semibold bg-gray-100 px-2 py-1 rounded-full">
              <svg
                className="animate-spin h-3 w-3 mr-1 text-gray-400"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Checking API...
            </span>
          )}
          {apiStatus === "down" && (
            <button
              onClick={wakeApi}
              className="flex items-center text-yellow-700 text-xs font-semibold bg-yellow-100 px-2 py-1 rounded-full hover:bg-yellow-200 transition-colors focus:outline-none"
              disabled={apiStatus === "waking"}
            >
              <svg
                className="h-3 w-3 mr-1 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01"
                />
              </svg>
              API Sleeping
              <span className="ml-2 underline">Wake Up</span>
            </button>
          )}
          {apiStatus === "waking" && (
            <span className="flex items-center text-yellow-700 text-xs font-semibold bg-yellow-100 px-2 py-1 rounded-full">
              <svg
                className="animate-spin h-3 w-3 mr-1 text-yellow-500"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Waking API...
            </span>
          )}
        </div>
      </div>
      <Link
        to="/new"
        className="flex items-center gap-2 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm font-semibold px-4 py-2 transition-colors shadow-sm border border-indigo-100"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        New Post
      </Link>
    </header>
  );
};

export default Header;
