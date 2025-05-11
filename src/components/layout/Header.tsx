
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, User, Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  const handleSignOut = () => {
    // Update the user login status
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.isLoggedIn = false;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    toast.success("Successfully signed out");
    navigate('/');
  };

  return (
    <header className="border-b h-16 flex items-center px-4 justify-between bg-background">
      <div className="flex items-center border rounded-md py-1 px-3 w-80">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <Input
          type="text"
          placeholder="Search files and folders"
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/uploaded-files')}>My Uploads</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
