import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mic, 
  Upload, 
  FileText, 
  Pause, 
  Loader2, 
  ArrowLeft, 
  Save,
  User,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Patient, NoteContent } from "@/types";
import { mockPatients } from "@/services/mockData";
import { toast } from "sonner";

const ScribePage = () => {
  const navigate = useNavigate();
  const [patients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedTab, setSelectedTab] = useState("live-recording");
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingUpload, setProcessingUpload] = useState(false);
  
  const [noteContent, setNoteContent] = useState<NoteContent>({
    chiefComplaint: "",
    history: "",
    examination: "",
    diagnosis: [],
    plan: "",
  });
  
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponses, setAiResponses] = useState<{ type: 'user' | 'ai', content: string }[]>([]);
  const [loadingAiResponse, setLoadingAiResponse] = useState(false);
  
  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      
      // Process the audio file (mock)
      setProcessingUpload(true);
      setTimeout(() => {
        setProcessingUpload(false);
        toast.success("Audio processed successfully");
        setNoteContent({
          chiefComplaint: "Patient reports intermittent abdominal pain in the upper right quadrant for the past 3 weeks",
          history: "Pain is dull and aching, rated 4/10, worse after meals especially fatty foods. No nausea, vomiting. No changes in bowel habits. No previous similar episodes.",
          examination: "Vitals stable. Abdomen soft, mild tenderness in RUQ. Murphy's sign negative. No rebound tenderness or guarding.",
          diagnosis: ["Functional dyspepsia", "Rule out gallbladder disease"],
          plan: "1. Ultrasound of abdomen\n2. Trial of PPI for 2 weeks\n3. Low-fat diet\n4. Return if symptoms worsen",
        });
      }, 2000);
    }
  };
  
  // Handle patient selection
  const handlePatientSelect = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
    }
  };
  
  // Toggle recording
  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      
      // Create timer for recording duration
      const interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
      setRecordingInterval(interval);
      
      // Mock transcription after a few seconds
      setTimeout(() => {
        setNoteContent(prev => ({
          ...prev,
          chiefComplaint: "Patient presents with burning sensation in the upper abdomen",
        }));
      }, 3000);
      
      setTimeout(() => {
        setNoteContent(prev => ({
          ...prev,
          history: "Symptoms started 2 weeks ago, worse after eating spicy foods. No vomiting. Taking OTC antacids with partial relief.",
        }));
      }, 6000);
      
    } else {
      // Stop recording
      setIsRecording(false);
      
      // Clear interval
      if (recordingInterval) {
        clearInterval(recordingInterval);
        setRecordingInterval(null);
      }
      
      // Complete the note with mock data
      setNoteContent(prev => ({
        ...prev,
        examination: "Abdomen soft, mild epigastric tenderness, no rebound or guarding. Normal bowel sounds.",
        diagnosis: ["Gastritis", "GERD"],
        plan: "1. Start PPI once daily\n2. Avoid spicy foods and alcohol\n3. Follow-up in 2 weeks\n4. If symptoms persist, consider endoscopy",
      }));
      
      toast.success("Recording processed successfully");
    }
  };
  
  // Format recording time
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  // Handle AI query submission
  const handleAIQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aiQuery.trim()) return;
    
    // Add user message to chat
    setAiResponses([...aiResponses, { type: 'user', content: aiQuery }]);
    
    // Simulate AI response
    setLoadingAiResponse(true);
    setTimeout(() => {
      let response = "";
      
      // Generate mock response based on query content
      if (aiQuery.toLowerCase().includes("summarize")) {
        response = "Patient presents with symptoms of upper abdominal pain, worse after meals. Physical examination shows tenderness in the right upper quadrant. Main differentials include functional dyspepsia and possible gallbladder disease. Recommended ultrasound and trial of PPI therapy.";
      } else if (aiQuery.toLowerCase().includes("treatment")) {
        response = "For suspected gastritis/GERD:\n1. PPI (e.g., Omeprazole 20mg) once daily before breakfast for 2 weeks\n2. Dietary modifications: avoid spicy foods, caffeine, alcohol, and acidic foods\n3. Smaller, more frequent meals\n4. Elevate head of bed\n5. Consider H2 blocker if symptoms persist despite PPI";
      } else {
        response = "Based on the patient's symptoms and examination findings, the most likely diagnosis is functional dyspepsia or early GERD. Would you like me to suggest appropriate diagnostic tests or treatment options?";
      }
      
      setAiResponses(prev => [...prev, { type: 'ai', content: response }]);
      setAiQuery("");
      setLoadingAiResponse(false);
    }, 1500);
  };
  
  // Update note content
  const updateNoteSection = (section: keyof NoteContent, value: string | string[]) => {
    setNoteContent(prev => ({
      ...prev,
      [section]: value,
    }));
  };
  
  // Save note
  const saveNote = () => {
    toast.success("Note saved successfully");
    navigate("/dashboard");
  };
  
  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [recordingInterval]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold">AI Scribe</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={saveNote}>
            <Save className="h-4 w-4 mr-2" />
            Save Note
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Patient Selection & Input Mode */}
        <div className="space-y-6 md:col-span-1">
          {/* Patient Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={selectedPatient?.id} 
                onValueChange={handlePatientSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedPatient && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mediscribe-primary rounded-full flex items-center justify-center text-white font-medium">
                      {selectedPatient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{selectedPatient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedPatient.age} years • {selectedPatient.gender}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Medical History:</span>
                      <span className="font-medium">{selectedPatient.medicalHistory}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">BMI:</span>
                      <span className="font-medium">{selectedPatient.bmi}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Input Modes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Input Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="live-recording" 
                className="w-full"
                value={selectedTab}
                onValueChange={setSelectedTab}
              >
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="live-recording">Live</TabsTrigger>
                  <TabsTrigger value="upload-recording">Upload</TabsTrigger>
                  <TabsTrigger value="manual">Manual</TabsTrigger>
                </TabsList>
                
                <TabsContent value="live-recording">
                  <div className="space-y-4">
                    <div className="text-center py-6">
                      <Button 
                        className={`w-16 h-16 rounded-full ${
                          isRecording 
                            ? "bg-red-500 hover:bg-red-600 animate-pulse-recording" 
                            : "bg-mediscribe-primary hover:bg-mediscribe-primary/90"
                        }`}
                        onClick={toggleRecording}
                      >
                        {isRecording ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Mic className="h-8 w-8" />
                        )}
                      </Button>
                      
                      <div className="mt-4">
                        {isRecording ? (
                          <div className="text-red-500 font-medium">
                            Recording... {formatRecordingTime(recordingDuration)}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">
                            {recordingDuration > 0 
                              ? "Recording paused" 
                              : "Press to start recording"
                            }
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      Speak clearly and the AI will transcribe and structure your consultation
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="upload-recording">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      {uploadedFile ? (
                        <div className="space-y-2">
                          <p className="font-medium">{uploadedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                          {processingUpload ? (
                            <div className="flex items-center justify-center gap-2 text-mediscribe-primary">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Processing audio...</span>
                            </div>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setUploadedFile(null)}
                            >
                              Replace file
                            </Button>
                          )}
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm font-medium">
                            Drop your audio file here or browse
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Supports MP3, WAV, M4A (max 60 min)
                          </p>
                          <Input 
                            type="file" 
                            className="hidden" 
                            id="audio-upload" 
                            accept=".mp3,.wav,.m4a"
                            onChange={handleFileUpload}
                          />
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => document.getElementById("audio-upload")?.click()}
                          >
                            Select File
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="manual">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Manually enter or paste your consultation notes
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        updateNoteSection("chiefComplaint", "Enter chief complaint here");
                        updateNoteSection("history", "Enter patient history here");
                        updateNoteSection("examination", "Enter examination findings here");
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Start Manual Entry
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* AI Assistant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md h-64 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-800">
                  {aiResponses.length === 0 ? (
                    <div className="text-center text-muted-foreground py-6">
                      <p>Ask the AI assistant for help</p>
                      <p className="text-xs mt-1">e.g. "Summarize this note"</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {aiResponses.map((msg, index) => (
                        <div 
                          key={index}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-2 rounded-lg ${
                              msg.type === 'user' 
                                ? 'bg-mediscribe-primary text-white' 
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                      
                      {loadingAiResponse && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
                            <div className="flex space-x-1 items-center">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleAIQuerySubmit} className="flex gap-2">
                  <Input
                    placeholder="Ask the AI assistant..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    disabled={loadingAiResponse}
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={!aiQuery.trim() || loadingAiResponse}
                    className="bg-mediscribe-primary hover:bg-mediscribe-primary/90"
                  >
                    {loadingAiResponse ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Note Editor */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Consultation Note</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                >
                  Apply Template
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Chief Complaint</h3>
                <Textarea 
                  placeholder="Enter chief complaint"
                  value={noteContent.chiefComplaint}
                  onChange={(e) => updateNoteSection("chiefComplaint", e.target.value)}
                  rows={2}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">History of Present Illness</h3>
                <Textarea 
                  placeholder="Enter patient history"
                  value={noteContent.history}
                  onChange={(e) => updateNoteSection("history", e.target.value)}
                  rows={5}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Physical Examination</h3>
                <Textarea 
                  placeholder="Enter examination findings"
                  value={noteContent.examination}
                  onChange={(e) => updateNoteSection("examination", e.target.value)}
                  rows={4}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Assessment/Diagnosis</h3>
                <div className="space-y-2">
                  {noteContent.diagnosis && noteContent.diagnosis.map((diagnosis, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={diagnosis} 
                        onChange={(e) => {
                          const newDiagnoses = [...noteContent.diagnosis!];
                          newDiagnoses[index] = e.target.value;
                          updateNoteSection("diagnosis", newDiagnoses);
                        }}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          const newDiagnoses = noteContent.diagnosis!.filter((_, i) => i !== index);
                          updateNoteSection("diagnosis", newDiagnoses);
                        }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => {
                      updateNoteSection("diagnosis", [...(noteContent.diagnosis || []), ""]);
                    }}
                  >
                    Add Diagnosis
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Plan</h3>
                <Textarea 
                  placeholder="Enter treatment plan"
                  value={noteContent.plan}
                  onChange={(e) => updateNoteSection("plan", e.target.value)}
                  rows={6}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline">Preview</Button>
                <Button onClick={saveNote} className="bg-mediscribe-primary hover:bg-mediscribe-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScribePage;
