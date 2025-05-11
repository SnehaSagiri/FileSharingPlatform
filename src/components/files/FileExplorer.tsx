
import React from 'react';
import FileCard, { FileOrFolder } from './FileCard';
import { Button } from "@/components/ui/button";
import { Plus, Grid2X2, List, FolderPlus } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import EmptyState from './EmptyState';
import { useNavigate } from 'react-router-dom';

interface FileExplorerProps {
  title: string;
  items: FileOrFolder[];
  loading?: boolean;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ title, items, loading }) => {
  const navigate = useNavigate();
  const [viewType, setViewType] = React.useState<'grid' | 'list'>('grid');
  
  const handleItemClick = (item: FileOrFolder) => {
    if (item.isFolder) {
      navigate(`/folders/${item.id}`);
    } else {
      navigate(`/preview/${item.id}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        
        <div className="flex items-center gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className={viewType === 'grid' ? 'bg-accent' : ''}
              onClick={() => setViewType('grid')}
            >
              <Grid2X2 size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={viewType === 'list' ? 'bg-accent' : ''}
              onClick={() => setViewType('list')}
            >
              <List size={18} />
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus size={16} /> New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/upload')}>Upload Files</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FolderPlus size={16} className="mr-2" /> New Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({length: 10}).map((_, i) => (
            <div key={i} className="h-48 bg-muted/20 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className={viewType === 'grid' ? "file-grid" : "space-y-2"}>
          {items.map((item) => (
            <FileCard 
              key={item.id} 
              item={item} 
              onClick={handleItemClick} 
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default FileExplorer;
