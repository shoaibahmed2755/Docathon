import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const OnboardingPage = () => {
  const { user, updatePreferences, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [specialty, setSpecialty] = useState<"gastro" | "obesity" | "both">(user?.specialty || "both");
  const [language, setLanguage] = useState("english");
  const [noteTemplate, setNoteTemplate] = useState("SOAP");
  const [loading, setLoading] = useState(false);
  
  const totalSteps = 3;
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    setLoading(true);
    
    // Update user preferences
    updateUser({ specialty: specialty as "gastro" | "obesity" | "both" });
    updatePreferences({
      language: language as "english" | "hindi" | "kannada",
      noteTemplate: noteTemplate as "SOAP" | "freeform" | "problem-oriented",
    });
    
    // Simulate API latency
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };
  
  function renderStep() {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specialty Preference</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Choose your medical specialty to personalize your experience
            </p>
            
            <RadioGroup value={specialty} onValueChange={(value: "gastro" | "obesity" | "both") => setSpecialty(value)} className="mt-4">
              <div className="flex flex-col space-y-3">
                <Label className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="gastro" id="gastro" />
                  <div className="ml-3">
                    <p className="font-medium">Gastroenterology</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Focus on digestive system disorders
                    </p>
                  </div>
                </Label>
                
                <Label className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="obesity" id="obesity" />
                  <div className="ml-3">
                    <p className="font-medium">Obesity Medicine</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Focus on weight management and metabolic health
                    </p>
                  </div>
                </Label>
                
                <Label className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="both" id="both" />
                  <div className="ml-3">
                    <p className="font-medium">Both Specialties</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cover both gastroenterology and obesity medicine
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Language Preference</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Choose your preferred language for the application interface
            </p>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="kannada">Kannada</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                More languages coming soon
              </p>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Note Template Style</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Choose your preferred format for consultation notes
            </p>
            
            <RadioGroup value={noteTemplate} onValueChange={setNoteTemplate} className="mt-4">
              <div className="flex flex-col space-y-3">
                <Label className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="SOAP" id="SOAP" />
                  <div className="ml-3">
                    <p className="font-medium">SOAP Format</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Subjective, Objective, Assessment, Plan
                    </p>
                  </div>
                </Label>
                
                <Label className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="freeform" id="freeform" />
                  <div className="ml-3">
                    <p className="font-medium">Freeform Notes</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Less structured format with flexible sections
                    </p>
                  </div>
                </Label>
                
                <Label className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="problem-oriented" id="problem-oriented" />
                  <div className="ml-3">
                    <p className="font-medium">Problem-Oriented</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Organized by patient problems/diagnoses
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle>Set Up Your Profile</CardTitle>
          <CardDescription>
            Help us personalize MediScribe AI for your practice
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress indicator */}
          <div className="flex mb-8">
            {Array(totalSteps)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex-1 relative"
                  onClick={() => index < currentStep && setCurrentStep(index)}
                >
                  <div
                    className={`h-1 ${
                      index <= currentStep
                        ? "bg-mediscribe-primary"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  ></div>
                  <div
                    className={`absolute top-0 left-0 right-0 flex items-center justify-center -mt-2 ${
                      index !== 0 ? "ml-[-6px]" : ""
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        index < currentStep
                          ? "bg-mediscribe-primary"
                          : index === currentStep
                          ? "bg-white border-2 border-mediscribe-primary"
                          : "bg-gray-200 dark:bg-gray-700"
                      } ${index < currentStep ? "cursor-pointer" : ""}`}
                    ></div>
                  </div>
                </div>
              ))}
          </div>

          {/* Step content */}
          {renderStep()}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            
            <Button 
              className="bg-mediscribe-primary hover:bg-mediscribe-primary/90"
              onClick={handleNext}
              disabled={loading}
            >
              {currentStep === totalSteps - 1 
                ? loading 
                  ? "Completing..." 
                  : "Complete Setup" 
                : "Next Step"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
