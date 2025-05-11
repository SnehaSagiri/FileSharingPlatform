
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileIcon, FolderIcon, Share2Icon, ShieldIcon } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="py-6 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">FileShare</span>
        </div>
        <div>
          <Link to="/login">
            <Button variant="outline" className="mr-2">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Store, Share, and Collaborate in One Place
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            A powerful file sharing platform that keeps your documents secure and makes collaboration easy.
          </p>
          <Link to="/signup">
            <Button size="lg" className="mr-4">Get Started - Free</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg">Log In</Button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Store Any File</h3>
                <p className="text-gray-600">Upload and store your documents, images, videos and more in a secure environment.</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FolderIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Organize Easily</h3>
                <p className="text-gray-600">Keep everything organized with folders and custom tags for easy retrieval.</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Share Securely</h3>
                <p className="text-gray-600">Generate secure links and control access to your shared files.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-10">Join thousands of users who trust our platform for their file sharing needs.</p>
            <Link to="/signup">
              <Button size="lg">Create Your Free Account</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <FileIcon className="h-5 w-5 text-primary" />
                <span className="font-bold">FileShare</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">© 2025 FileShare. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-primary">Terms</a>
              <a href="#" className="text-gray-600 hover:text-primary">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
