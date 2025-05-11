import React, { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    isLoggedIn: false,
    profilePic: ''
  });

  const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]').length;

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!storedUserData.isLoggedIn) {
      navigate('/login');
      return;
    }
    setUserData(storedUserData);
  }, [navigate]);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      const updatedUserData = { ...userData, profilePic: base64Image };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
    };

    reader.readAsDataURL(file);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center gap-4 relative">
                <div className="relative group">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.profilePic || ''} />
                    <AvatarFallback className="text-2xl">
                      {userData.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  {/* Overlay + button */}
                  <div
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 border border-white cursor-pointer hover:scale-105 transition"
                    title="Change photo"
                  >
                    <Plus className="w-4 h-4" />
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </div>

                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <p className="text-muted-foreground">{userData.email}</p>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium">Name</dt>
                    <dd>{userData.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Email</dt>
                    <dd>{userData.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Files Uploaded</dt>
                    <dd>{uploadedFiles}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;