
import React from 'react';
import Layout from '@/components/layout/Layout';
import FileExplorer from '@/components/files/FileExplorer';
import { useParams } from 'react-router-dom';

// Dummy data
const dummyFolders = {
  '7': { // Marketing Materials
    name: 'Marketing Materials',
    files: [
      { 
        id: 'm1', 
        name: 'Brand Guidelines.pdf', 
        type: 'application/pdf',
        size: 3240000, 
        modifiedAt: new Date('2025-05-01')
      },
      { 
        id: 'm2', 
        name: 'Logo Pack.zip', 
        type: 'application/zip',
        size: 15800000, 
        modifiedAt: new Date('2025-05-02')
      },
      { 
        id: 'm3', 
        name: 'Social Media Images', 
        type: 'folder',
        modifiedAt: new Date('2025-05-03'),
        isFolder: true
      }
    ]
  },
  '8': { // Personal Documents
    name: 'Personal Documents',
    files: [
      { 
        id: 'p1', 
        name: 'Resume.pdf', 
        type: 'application/pdf',
        size: 420000, 
        modifiedAt: new Date('2025-05-04')
      },
      { 
        id: 'p2', 
        name: 'ID Scan.jpg', 
        type: 'image/jpeg',
        size: 2800000, 
        modifiedAt: new Date('2025-05-05')
      }
    ]
  }
};

const FolderView = () => {
  const { folderId } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [folder, setFolder] = React.useState<{name: string, files: any[]} | null>(null);

  React.useEffect(() => {
    if (!folderId) return;
    
    // Simulate API call
    setTimeout(() => {
      setFolder(dummyFolders[folderId as keyof typeof dummyFolders] || { name: 'Unknown Folder', files: [] });
      setLoading(false);
    }, 800);
  }, [folderId]);

  if (!folder && !loading) return <div>Folder not found</div>;

  return (
    <Layout>
      <FileExplorer
        title={folder?.name || 'Loading...'}
        items={folder?.files || []}
        loading={loading}
      />
    </Layout>
  );
};

export default FolderView;
