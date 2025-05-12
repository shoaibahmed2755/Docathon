
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setLoading(false);
      toast.success("Password reset link sent to your email");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {isSubmitted 
            ? "Check your email for reset instructions" 
            : "Enter your email to receive a password reset link"}
        </p>
      </div>
      
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="doctor@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <Button type="submit" className="w-full bg-mediscribe-primary hover:bg-mediscribe-primary/90" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-green-600 dark:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <p>
            We've sent password reset instructions to <strong>{email}</strong>
          </p>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Try again
            </Button>
          </div>
        </div>
      )}
      
      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link to="/login" className="text-mediscribe-primary font-medium hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
