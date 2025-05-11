import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FileIcon } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(''); // To store error message

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Get user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (!storedUserData || storedUserData.email !== email || storedUserData.password !== password) {
      setError("Invalid credentials. Please try again.");
      toast.error("Invalid credentials");
      return;
    }

    // If credentials match, log the user in
    const userData = {
      name: storedUserData.name,
      email: storedUserData.email,
      isLoggedIn: true
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    toast.success("Successfully logged in");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <FileIcon className="h-6 w-6 text-primary" />
            <span>FileShare</span>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Log in to your account</CardTitle>
            <CardDescription>Enter your email and password to access your files</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-sm text-red-500">{error}</div>}
            </CardContent>
            
            <CardFooter className="flex-col gap-4">
              <Button type="submit" className="w-full">Log In</Button>
              
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;