
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 hustlr-gradient-text">Hustlrs</h2>
            <p className="text-gray-400 mb-4">
              Nigeria's flexible task and freelance marketplace connecting people who need help with skilled taskers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-hustlr-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hustlr-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hustlr-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hustlr-green transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-task" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  Post a Task
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">For Taskers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/become-tasker" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  Become a Tasker
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link to="/earnings" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  Earnings
                </Link>
              </li>
              <li>
                <Link to="/tasker-faq" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  Tasker FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/trust-safety" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-hustlr-green transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Hustlrs. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-gray-500 text-sm hover:text-hustlr-green transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-hustlr-green transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="text-gray-500 text-sm hover:text-hustlr-green transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
