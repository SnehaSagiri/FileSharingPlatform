
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import { Plus, Upload, FileIcon, FolderIcon, HomeIcon } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string): boolean => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="hidden md:flex flex-col border-r w-64 bg-sidebar">
      <div className="h-16 border-b flex items-center px-6">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <FileIcon className="h-5 w-5 text-primary" />
          <span>FileShare</span>
        </Link>
      </div>

      <div className="p-4">
        <Button asChild className="w-full justify-start gap-2">
          <Link to="/upload">
            <Plus className="h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 p-2">
          <Button 
            asChild 
            variant={isActive('/dashboard') ? "secondary" : "ghost"}
            className="justify-start gap-2"
          >
            <Link to="/dashboard">
              <HomeIcon className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant={isActive('/folders') ? "secondary" : "ghost"}
            className="justify-start gap-2"
          >
            <Link to="/folders">
              <FolderIcon className="h-4 w-4" />
              My Folders
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant={isActive('/upload') ? "secondary" : "ghost"}
            className="justify-start gap-2"
          >
            <Link to="/upload">
              <Upload className="h-4 w-4" />
              Upload Files
            </Link>
          </Button>
        </nav>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <div className="bg-primary/10 rounded-md p-4 text-sm">
          <p className="font-medium mb-1">Storage</p>
          <div className="w-full bg-primary/10 h-2 rounded-full overflow-hidden mb-1">
            <div className="bg-primary h-full rounded-full w-[45%]" />
          </div>
          <p className="text-xs text-muted-foreground">4.5 GB of 10 GB used</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
