
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
}

const FileUploader = () => {
  const navigate = useNavigate();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    // Create uploading file objects
    const newFiles = Array.from(files).map(file => ({
      id: `${file.name}-${Date.now()}`,
      file,
      progress: 0,
      status: 'uploading' as const
    }));
    
    setUploadingFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach(fileObj => {
      simulateFileUpload(fileObj.id, fileObj.file);
    });
  };

  const simulateFileUpload = (fileId: string, file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setUploadingFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, progress: 100, status: 'complete' } 
              : f
          )
        );
        
        // Save to localStorage when upload completes
        saveUploadedFile({
          id: fileId,
          name: file.name,
          type: file.type,
          size: file.size,
          modifiedAt: new Date(),
          isFolder: false
        });
        
        toast.success("File uploaded successfully");
        
        // Remove the file from list after 2 seconds
        setTimeout(() => {
          setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
        }, 2000);
      }
      
      setUploadingFiles(prev => 
        prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        )
      );
    }, 200);
  };
  
  const saveUploadedFile = (fileData) => {
    // Get existing files from localStorage
    const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    
    // Add new file
    const updatedFiles = [...existingFiles, fileData];
    
    // Save back to localStorage
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getTotalProgress = () => {
    if (uploadingFiles.length === 0) return 0;
    const totalProgress = uploadingFiles.reduce((sum, file) => sum + file.progress, 0);
    return totalProgress / uploadingFiles.length;
  };
  
  const allUploaded = uploadingFiles.length > 0 && uploadingFiles.every(file => file.status === 'complete');

  return (
    <div className="max-w-3xl mx-auto">
      <div 
        className={`border-2 border-dashed rounded-lg p-12 text-center ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted'
        } transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
          <Upload size={28} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Drag and drop files</h3>
        <p className="text-muted-foreground mb-6">
          or click to browse from your computer
        </p>
        <Button onClick={() => fileInputRef.current?.click()}>
          Select Files
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {uploadingFiles.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Uploading Files</h3>
            <p className="text-sm text-muted-foreground">
              {Math.round(getTotalProgress())}% complete
            </p>
          </div>
          <Progress value={getTotalProgress()} className="mb-4" />
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {uploadingFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between border rounded-md p-3"
              >
                <div className="flex items-center">
                  {file.status === 'complete' ? (
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                  ) : (
                    <div className="h-5 w-5 mr-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  )}
                  <div>
                    <p className="font-medium text-sm truncate max-w-xs">{file.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-xs mr-4">{Math.round(file.progress)}%</p>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFile(file.id)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-6 gap-3">
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button 
              disabled={!allUploaded} 
              onClick={() => navigate('/uploaded-files')}
            >
              {allUploaded ? 'View Uploaded Files' : 'Uploading...'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
