import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

interface NavbarCtxTypes {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const NavbarContext = createContext<NavbarCtxTypes>({
  isDialogOpen: false,
  setIsDialogOpen: () => {},
});

export const NavbarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const value = useMemo(
    () => ({
      isDialogOpen,
      setIsDialogOpen,
    }),
    [isDialogOpen]
  );

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNavbarContext = () => useContext(NavbarContext);
