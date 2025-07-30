import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-pink-600">FoodieFinder</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-pink-600">Home</Link>
        <Link to="/categories" className="hover:text-pink-600">Categories</Link>
        <Link to="/random" className="hover:text-pink-600">Random</Link>
      </div>
    </nav>
  );
};

export default Navbar;
