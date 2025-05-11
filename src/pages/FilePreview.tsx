
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Share, Link, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { toast } from "sonner";

// Dummy data for file previews
const dummyFiles = {
  '1': { // Project Proposal
    name: 'Project Proposal.pdf',
    type: 'application/pdf',
    size: 2540000,
    modifiedAt: new Date('2025-05-01'),
    previewUrl: 'https://www.africau.edu/images/default/sample.pdf',
    uploadedBy: 'Alex Johnson',
  },
  '2': { // Team Photo
    name: 'Team Photo.jpg',
    type: 'image/jpeg',
    size: 4200000,
    modifiedAt: new Date('2025-05-03'),
    previewUrl: 'https://source.unsplash.com/random/800x600/?team',
    uploadedBy: 'Alex Johnson',
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const FilePreview = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [file, setFile] = React.useState<any>(null);

  React.useEffect(() => {
    if (!fileId) return;
    
    // Simulate API call
    setTimeout(() => {
      setFile(dummyFiles[fileId as keyof typeof dummyFiles] || null);
      setLoading(false);
    }, 800);
  }, [fileId]);

  const handleDownload = () => {
    if (!file) return;
    
    toast.success(`Downloading ${file.name}`);
    
    // In a real implementation, you would use an API call to get the file
    console.log(`Downloading file: ${fileId}`);
    
    // Mock download functionality
    setTimeout(() => {
      toast.success(`${file.name} downloaded successfully`);
    }, 1500);
  };

  const handleShare = () => {
    if (!file) return;
    
    // In a real implementation, this would generate a sharing link
    const shareLink = `https://fileshare.app/shared/${fileId}`;
    
    // Mock copy to clipboard
    navigator.clipboard.writeText(shareLink)
      .then(() => toast.success(`Sharing link for ${file.name} copied to clipboard`))
      .catch(() => toast.error("Failed to copy sharing link"));
    
    console.log(`Sharing file: ${fileId}, link: ${shareLink}`);
  };

  const handleCopyLink = () => {
    const shareLink = `https://fileshare.app/shared/${fileId}`;
    
    // Mock copy to clipboard
    navigator.clipboard.writeText(shareLink)
      .then(() => toast.success("Link copied to clipboard"))
      .catch(() => toast.error("Failed to copy link"));
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading file...</p>
        </div>
      </Layout>
    );
  }

  if (!file) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-2">File Not Found</h2>
          <p className="text-muted-foreground mb-6">The file you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>Back to Files</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={18} className="mr-1" /> Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col">
            <Card className="p-6 mb-6 flex-grow flex flex-col">
              <h1 className="text-2xl font-bold mb-4">{file.name}</h1>
              
              <div className="flex-grow bg-accent/30 rounded-lg flex items-center justify-center overflow-hidden">
                {file.type.startsWith('image/') ? (
                  <img 
                    src={file.previewUrl} 
                    alt={file.name}
                    className="max-w-full max-h-96 object-contain"
                  />
                ) : file.type === 'application/pdf' ? (
                  <iframe 
                    src={file.previewUrl} 
                    title={file.name}
                    className="w-full h-full min-h-[400px]"
                  />
                ) : (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">Preview not available for this file type</p>
                    <Button className="mt-4" onClick={handleDownload}>
                      <Download size={18} className="mr-2" /> Download to View
                    </Button>
                  </div>
                )}
              </div>
            </Card>
            
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleDownload}>
                <Download size={18} className="mr-2" /> Download
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleShare}>
                <Share size={18} className="mr-2" /> Share
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">File Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p>{file.type}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p>{formatFileSize(file.size)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Modified</p>
                  <p>{formatDistanceToNow(file.modifiedAt, { addSuffix: true })}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Uploaded by</p>
                  <p>{file.uploadedBy}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Sharing</h2>
              
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Share Link</p>
                <div className="flex items-center gap-2">
                  <div className="bg-muted p-2 rounded-md flex-grow text-xs truncate">
                    https://fileshare.app/shared/{fileId}
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCopyLink}>
                    <Link size={16} />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => toast.info("Access management dialog would open here")}>
                Manage Access
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FilePreview;
