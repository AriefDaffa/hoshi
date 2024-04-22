import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 w-full bg-[#09090B] z-50">
      <div className="h-14 border-b-[1px] flex justify-center w-full">
        <div className="flex justify-between items-center h-full px-4 w-full max-w-screen-xl">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src="/assets/images/logo.png" alt="" className="h-10" />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
