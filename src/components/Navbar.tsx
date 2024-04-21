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
            <img src="/assets/images/logo.png" alt="" className="h-12" />
          </div>
          <div>
            {/* <Button
              variant="outline"
              className="text-muted-foreground"
              onClick={() => setOpen(true)}
            >
              Browse {''}
              <kbd className="ml-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button> */}
          </div>
        </div>
      </div>
      {/* <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <FaceIcon className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Launch</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
              <span>Mail</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <GearIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog> */}
    </div>
  );
};

export default Navbar;
