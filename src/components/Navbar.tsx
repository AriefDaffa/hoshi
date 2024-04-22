import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import type { FC } from 'react';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  const navigateSearch = () => {
    navigate('/search');
  };

  return (
    <div className="sticky top-0 w-full bg-[#09090B] z-50">
      <div className="h-14 border-b-[1px] flex justify-center w-full">
        <div className="flex justify-between items-center h-full px-4 w-full max-w-screen-xl">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={navigateHome}
          >
            <img src="/assets/images/logo.png" alt="" className="h-10" />
          </div>
          <div>
            <div
              className="bg-primary py-2 px-4 rounded-md text-muted-foreground flex justify-center items-center gap-4 cursor-pointer"
              onClick={navigateSearch}
            >
              <span className="hidden text-sm sm:block">
                Click here to search...
              </span>
              <FaSearch size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
