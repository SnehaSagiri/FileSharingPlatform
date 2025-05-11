import React from 'react';
import Layout from '@/components/layout/Layout';
import FileExplorer from '@/components/files/FileExplorer';

const initialFolders = [
  { id: '1', name: 'PDF Files', type: 'folder', modifiedAt: new Date(), isFolder: true, files: [] },
  { id: '2', name: 'JPG Files', type: 'folder', modifiedAt: new Date(), isFolder: true, files: [] }
];

const Folders = () => {
  const [loading, setLoading] = React.useState(true);
  const [folders, setFolders] = React.useState([]);

  React.useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');

    const foldersWithFiles = initialFolders.map(folder => {
      const filesInFolder = storedFiles.filter((file: any) => file.folderId === folder.id);
      return {
        ...folder,
        files: filesInFolder
      };
    });

    setFolders(foldersWithFiles);
    setLoading(false);
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <FileExplorer
          title="My Folders"
          items={folders}
          loading={loading}
        />
      </div>
    </Layout>
  );
};

export default Folders;