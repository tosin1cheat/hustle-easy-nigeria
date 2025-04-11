
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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
            <Link to="/browse-tasks" className="text-gray-700 hover:text-hustlr-green font-medium">
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
            
            {user ? (
              <>
                <Button variant="ghost" size="icon">
                  <Bell size={20} />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.profile_image_url} alt={user.first_name} />
                        <AvatarFallback className="bg-hustlr-green text-white">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.first_name} {user.last_name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/wallet")}>
                      <span>Wallet (₦{user.wallet_balance?.toLocaleString()})</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/my-tasks")}>
                      <span>My Tasks</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/auth/sign-in")}>
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="bg-hustlr-green hover:bg-hustlr-darkgreen text-white"
                  onClick={() => navigate("/auth/sign-up")}
                >
                  Sign Up
                </Button>
              </>
            )}
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
            <Link to="/browse-tasks" className="block py-2 text-gray-700 hover:text-hustlr-green font-medium">
              Browse Tasks
            </Link>
            <Link to="/post-task" className="block py-2 text-gray-700 hover:text-hustlr-green font-medium">
              Post a Task
            </Link>
            <Link to="/how-it-works" className="block py-2 text-gray-700 hover:text-hustlr-green font-medium">
              How It Works
            </Link>
            
            {user ? (
              <>
                <div className="flex items-center py-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={user.profile_image_url} alt={user.first_name} />
                    <AvatarFallback className="bg-hustlr-green text-white">
                      {user.first_name?.[0]}{user.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.first_name} {user.last_name}</p>
                    <p className="text-xs text-gray-500">₦{user.wallet_balance?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => navigate("/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => navigate("/my-tasks")}
                  >
                    My Tasks
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-500" 
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate("/auth/sign-in")}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-hustlr-green hover:bg-hustlr-darkgreen text-white"
                  onClick={() => navigate("/auth/sign-up")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
