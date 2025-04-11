
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Bell } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold hustlr-gradient-text">Hustlrs</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-hustlr-green font-medium">
              Home
            </Link>
            <Link to="/browse" className="text-gray-700 hover:text-hustlr-green font-medium">
              Browse Tasks
            </Link>
            <Link to="/post-task" className="text-gray-700 hover:text-hustlr-green font-medium">
              Post a Task
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-hustlr-green font-medium">
              How It Works
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Search size={18} className="mr-2" />
              Search
            </Button>
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-hustlr-green hover:bg-hustlr-darkgreen text-white">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link to="/" className="block py-2 text-gray-700 hover:text-hustlr-green font-medium">
              Home
            </Link>
            <Link to="/browse" className="block py-2 text-gray-700 hover:text-hustlr-green font-medium">
              Browse Tasks
            </Link>
            <Link to="/post-task" className="block py-2 text-gray-700 hover:text-hustlr-green font-medium">
              Post a Task
            </Link>
            <Link to="/how-it-works" className="block py-2 text-gray-700 hover:text-hustlr-green font-medium">
              How It Works
            </Link>
            <div className="flex space-x-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1">
                Sign In
              </Button>
              <Button size="sm" className="flex-1 bg-hustlr-green hover:bg-hustlr-darkgreen text-white">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
