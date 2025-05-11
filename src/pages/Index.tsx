
import React from 'react';
import Layout from '@/components/layout/Layout';
import FileExplorer from '@/components/files/FileExplorer';

// Dummy data for the files
const dummyFiles = [
  { 
    id: '1', 
    name: 'Project Proposal.pdf', 
    type: 'application/pdf',
    size: 2540000, 
    modifiedAt: new Date('2025-05-01')
  },
  { 
    id: '2', 
    name: 'Team Photo.jpg', 
    type: 'image/jpeg',
    size: 4200000, 
    modifiedAt: new Date('2025-05-03')
  },
  { 
    id: '3', 
    name: 'Financial Report.xlsx', 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1800000, 
    modifiedAt: new Date('2025-05-05')
  },
  { 
    id: '4', 
    name: 'Client Meeting Notes.txt', 
    type: 'text/plain',
    size: 45000, 
    modifiedAt: new Date('2025-05-06')
  },
  { 
    id: '5', 
    name: 'Product Demo.mp4', 
    type: 'video/mp4',
    size: 128000000, 
    modifiedAt: new Date('2025-05-07')
  },
  { 
    id: '6', 
    name: 'Website Backup.zip', 
    type: 'application/zip',
    size: 158000000, 
    modifiedAt: new Date('2025-05-08')
  },
  { 
    id: '7', 
    name: 'Marketing Materials', 
    type: 'folder',
    modifiedAt: new Date('2025-05-09'),
    isFolder: true
  },
  { 
    id: '8', 
    name: 'Personal Documents', 
    type: 'folder',
    modifiedAt: new Date('2025-05-10'),
    isFolder: true
  },
];

const Index = () => {
  const [loading, setLoading] = React.useState(true);
  const [files, setFiles] = React.useState([]);
  
  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFiles(dummyFiles);
      setLoading(false);
    }, 800);
  }, []);
  
  return (
    <Layout>
      <FileExplorer
        title="All Files"
        items={files}
        loading={loading}
      />
    </Layout>
  );
};

export default Index;
