
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import FileExplorer from '@/components/files/FileExplorer';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const UploadedFiles = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Simulate API call to fetch uploaded files
    setTimeout(() => {
      const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      setFiles(uploadedFiles);
      setLoading(false);
      
      if (uploadedFiles.length === 0) {
        toast.info("No files have been uploaded yet");
      }
    }, 800);
  }, [navigate]);
  
  return (
    <Layout>
      <FileExplorer
        title="My Uploads"
        items={files}
        loading={loading}
      />
    </Layout>
  );
};

export default UploadedFiles;
