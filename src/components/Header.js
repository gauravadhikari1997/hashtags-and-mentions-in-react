import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link to="/">
        <h2 className="text-lg leading-6 font-medium text-black px-4 py-2">
          <span className="text-green-400">#</span>n
          <span className="text-blue-400">@</span>
        </h2>
      </Link>
      <Link
        to="/new"
        className="hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2"
      >
        New
      </Link>
    </header>
  );
};

export default Header;
