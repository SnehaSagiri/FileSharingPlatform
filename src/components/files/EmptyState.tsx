
import React from 'react';
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-muted/30 rounded-full p-6 mb-4">
        <UploadIcon size={40} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">No files yet</h3>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        Upload your first file or create a folder to get started with organizing your content
      </p>
      <Button onClick={() => navigate('/upload')}>
        <UploadIcon size={18} className="mr-2" /> Upload Files
      </Button>
    </div>
  );
};

export default EmptyState;
