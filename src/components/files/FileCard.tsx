
import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  FileIcon, 
  FileImageIcon, 
  FileTextIcon, 
  FileArchiveIcon, 
  FileCode as FileCodeIcon,
  MoreVertical,
  FolderIcon
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from 'date-fns';
import { toast } from "sonner";

export interface FileOrFolder {
  id: string;
  name: string;
  type: string;
  size?: number;
  modifiedAt: Date;
  isFolder?: boolean;
}

interface FileCardProps {
  item: FileOrFolder;
  onClick: (item: FileOrFolder) => void;
}

const formatFileSize = (bytes?: number): string => {
  if (bytes === undefined) return '';
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const FileCard: React.FC<FileCardProps> = ({ item, onClick }) => {
  const getIcon = () => {
    if (item.isFolder) return <FolderIcon className="text-file-yellow" />;
    
    switch (item.type.split('/')[0]) {
      case 'image':
        return <FileImageIcon className="text-file-blue" />;
      case 'application':
        if (item.type.includes('pdf')) return <FileIcon className="text-file-red" />;
        if (item.type.includes('zip') || item.type.includes('rar')) return <FileArchiveIcon className="text-file-purple" />;
        if (item.type.includes('json') || item.type.includes('xml') || item.type.includes('html')) 
          return <FileCodeIcon className="text-file-green" />;
        return <FileIcon className="text-file-gray" />;
      case 'text':
        return <FileTextIcon className="text-file-green" />;
      default:
        return <FileIcon className="text-file-gray" />;
    }
  };

  // Implement the functionality for file operations
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Downloading ${item.name}`);
    
    // In a real implementation, you would use an API call to get the file
    console.log(`Downloading file: ${item.id}`);
    
    // Mock download functionality
    setTimeout(() => {
      toast.success(`${item.name} downloaded successfully`);
    }, 1500);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // In a real implementation, this would generate a sharing link
    const shareLink = `https://fileshare.app/shared/${item.id}`;
    
    // Mock copy to clipboard
    navigator.clipboard.writeText(shareLink)
      .then(() => toast.success(`Sharing link for ${item.name} copied to clipboard`))
      .catch(() => toast.error("Failed to copy sharing link"));
    
    console.log(`Sharing file: ${item.id}, link: ${shareLink}`);
  };

  const handleMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // In a real implementation, this would open a folder selection dialog
    toast.info(`Select destination folder for ${item.name}`);
    console.log(`Moving file: ${item.id}`);
    
    // Mock move operation
    setTimeout(() => {
      toast.success(`${item.name} moved successfully`);
    }, 1500);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // In a real implementation, this would confirm deletion first
    toast.info(`Deleting ${item.name}...`, {
      duration: 3000,
      action: {
        label: "Undo",
        onClick: () => toast.success(`Deletion of ${item.name} canceled`)
      }
    });
    
    console.log(`Deleting file: ${item.id}`);
    
    // Mock delete operation
    setTimeout(() => {
      toast.success(`${item.name} deleted successfully`);
    }, 3000);
  };

  return (
    <Card 
      className="file-card cursor-pointer group" 
      onClick={() => onClick(item)}
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <MoreVertical size={16} className="cursor-pointer text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDownload}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>Share</DropdownMenuItem>
            <DropdownMenuItem onClick={handleMove}>Move</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="file-icon">
        {getIcon()}
      </div>
      
      <div className="text-center">
        <p className="font-medium truncate text-sm">{item.name}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {item.isFolder ? (
            `Modified ${formatDistanceToNow(item.modifiedAt, { addSuffix: true })}`
          ) : (
            <>
              {formatFileSize(item.size)}
              <br/>
              {formatDistanceToNow(item.modifiedAt, { addSuffix: true })}
            </>
          )}
        </p>
      </div>
    </Card>
  );
};

export default FileCard;
