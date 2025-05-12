
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ModeToggle } from "@/components/mode-toggle";
import logo from "@/assets/logo.svg";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <div className="hidden md:flex md:w-1/2 bg-mediscribe-primary p-10 flex-col justify-between text-white relative overflow-hidden">
        <div className="z-10">
          <div className="flex items-center mb-8">
            {logo ? (
              <img src={logo} alt="MediScribe" className="h-8 mr-2" />
            ) : (
              <span className="text-2xl font-bold">MediScribe<span className="text-mediscribe-secondary">AI</span></span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            AI-Powered Medical Documentation
          </h1>
          
          <p className="text-xl max-w-lg">
            Specialized for Gastroenterology & Obesity practices. Save time, improve accuracy, and focus on what matters most - your patients.
          </p>
          
          <div className="mt-8">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm mb-4">
              <p className="font-medium">
                "MediScribe has cut my documentation time in half, allowing me to see more patients without compromising quality."
              </p>
              <p className="mt-2 text-sm">— Dr. Vikram Patel, Gastroenterologist</p>
            </div>
          </div>
        </div>
        
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-mediscribe-primary via-mediscribe-primary to-mediscribe-secondary opacity-30"></div>
        
        {/* Abstract medical background shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute right-[-50px] top-[20%] w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute left-[-20px] bottom-[10%] w-48 h-48 rounded-full bg-white"></div>
        </div>
        
        <p className="text-sm z-10">© 2025 MediScribe AI. All rights reserved.</p>
      </div>
      
      <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        
        <div className="md:hidden mb-6 flex items-center">
          {logo ? (
            <img src={logo} alt="MediScribe" className="h-8 mr-2" />
          ) : (
            <span className="text-2xl font-bold">MediScribe<span className="text-mediscribe-secondary">AI</span></span>
          )}
        </div>
        
        <div className="w-full max-w-md mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
