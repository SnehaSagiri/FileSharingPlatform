import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.isLoggedIn) {
      navigate('/login');
    }

    // Apply saved theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, [navigate]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={toggleTheme}>
              Switch to {isDark ? 'Light' : 'Dark'} Mode
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;