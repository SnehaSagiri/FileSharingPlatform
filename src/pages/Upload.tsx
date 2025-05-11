
import React from 'react';
import Layout from '@/components/layout/Layout';
import FileUploader from '@/components/upload/FileUploader';

const Upload = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload Files</h1>
        <FileUploader />
      </div>
    </Layout>
  );
};

export default Upload;
