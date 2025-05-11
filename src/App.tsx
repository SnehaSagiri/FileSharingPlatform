
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Upload from "./pages/Upload";
import FolderView from "./pages/FolderView";
import Folders from "./pages/Folders";
import FilePreview from "./pages/FilePreview";
import UploadedFiles from "./pages/UploadedFiles";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

// Setup theme from localStorage on initial load
const setupTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

setupTheme();

// Auth guard component
const AuthGuard = ({ children }) => {
  // Check if user is logged in
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  return userData.isLoggedIn ? children : <Login />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<AuthGuard><Index /></AuthGuard>} />
          <Route path="/upload" element={<AuthGuard><Upload /></AuthGuard>} />
          <Route path="/folders" element={<AuthGuard><Folders /></AuthGuard>} />
          <Route path="/folders/:folderId" element={<AuthGuard><FolderView /></AuthGuard>} />
          <Route path="/preview/:fileId" element={<AuthGuard><FilePreview /></AuthGuard>} />
          <Route path="/uploaded-files" element={<AuthGuard><UploadedFiles /></AuthGuard>} />
          <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
          <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
