
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Edit,
  FileText, 
  ChevronLeft,
  Mic,
  User,
  LineChart,
  Activity,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Patient, ConsultationNote, Medication } from "@/types";
import { mockPatients, mockNotes } from "@/services/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const PatientProfilePage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<ConsultationNote[]>([]);
  
  useEffect(() => {
    // Find patient matching the ID
    if (patientId) {
      const foundPatient = mockPatients.find(p => p.id === patientId);
      if (foundPatient) {
        setPatient(foundPatient);
      }
      
      // Find notes for this patient
      const patientNotes = mockNotes.filter(n => n.patientId === patientId);
      setNotes(patientNotes);
    }
  }, [patientId]);
  
  // Calculate BMI category
  const getBMICategory = (bmi?: number): { label: string; color: string } => {
    if (!bmi) return { label: "Not available", color: "bg-gray-200 text-gray-800" };
    
    if (bmi < 18.5) return { label: "Underweight", color: "bg-blue-100 text-blue-800" };
    if (bmi < 25) return { label: "Normal weight", color: "bg-green-100 text-green-800" };
    if (bmi < 30) return { label: "Overweight", color: "bg-yellow-100 text-yellow-800" };
    if (bmi < 35) return { label: "Obesity Class I", color: "bg-orange-100 text-orange-800" };
    if (bmi < 40) return { label: "Obesity Class II", color: "bg-red-100 text-red-800" };
    return { label: "Obesity Class III", color: "bg-red-200 text-red-900" };
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  if (!patient) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">Patient not found</p>
          <Button 
            variant="link" 
            className="mt-2" 
            onClick={() => navigate("/patients")}
          >
            Back to patients list
          </Button>
        </div>
      </div>
    );
  }
  
  // Get BMI category
  const bmiCategory = getBMICategory(patient.bmi);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/patients")}
          className="mr-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">Patient Profile</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Patient info */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Patient Information</CardTitle>
                <Button size="icon" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt={patient.name} />
                  <AvatarFallback className="bg-mediscribe-primary text-white text-xl">
                    {patient.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">{patient.name}</h3>
                  <p className="text-muted-foreground">
                    {patient.age} years • {patient.gender}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{patient.email || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="text-sm font-medium">{patient.contactNumber || "Not provided"}</p>
                </div>
                <div className="col-span-2 space-y-1 pt-2">
                  <p className="text-sm text-muted-foreground">Patient since</p>
                  <p className="text-sm font-medium">{formatDate(patient.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">BMI</span>
                  <span className="font-semibold">{patient.bmi?.toFixed(1) || "N/A"}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  {patient.bmi && (
                    <div 
                      className="h-full bg-mediscribe-primary rounded-full" 
                      style={{ width: `${Math.min(patient.bmi * 2.5, 100)}%` }}
                    ></div>
                  )}
                </div>
                <span className="text-xs">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${bmiCategory.color}`}>
                    {bmiCategory.label}
                  </span>
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="text-sm font-medium">{patient.weight} kg</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Height</p>
                  <p className="text-sm font-medium">{patient.height} cm</p>
                </div>
              </div>
              
              <div className="space-y-1 pt-2">
                <p className="text-sm text-muted-foreground">Medical History</p>
                <p className="text-sm">{patient.medicalHistory || "No medical history recorded"}</p>
              </div>
              
              <div className="space-y-2 pt-2">
                <p className="text-sm text-muted-foreground">Allergies</p>
                <div className="flex flex-wrap gap-1">
                  {patient.allergies && patient.allergies.length > 0 ? (
                    patient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm">No known allergies</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Current Medications</CardTitle>
                <Button size="sm" variant="ghost" className="h-8 p-0">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Edit</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {patient.medications && patient.medications.length > 0 ? (
                <div className="space-y-3">
                  {patient.medications.map((med, index) => (
                    <div key={index} className="border-b pb-2 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <p className="font-medium">{med.name}</p>
                        <Badge variant="outline" className="text-xs">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} • {med.frequency}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No current medications</p>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add Medication
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right column - Tabs with consultations, notes history */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Patient Record</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => navigate(`/scribe/${patient.id}`)}
                    className="bg-mediscribe-primary hover:bg-mediscribe-primary/90"
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    Start Consult
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="notes">
                <TabsList className="mb-4">
                  <TabsTrigger value="notes">
                    <FileText className="h-4 w-4 mr-2" />
                    Consultation Notes
                  </TabsTrigger>
                  <TabsTrigger value="trends">
                    <LineChart className="h-4 w-4 mr-2" />
                    Health Trends
                  </TabsTrigger>
                  <TabsTrigger value="vitals">
                    <Activity className="h-4 w-4 mr-2" />
                    Vitals
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="notes" className="space-y-4">
                  {notes.length > 0 ? (
                    notes.map(note => (
                      <Card key={note.id}>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <p className="text-sm font-medium">
                                {formatDate(note.date)}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge variant={note.status === "completed" ? "default" : "outline"}>
                                {note.status}
                              </Badge>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <h4 className="text-xs font-medium text-muted-foreground">Chief Complaint</h4>
                              <p className="text-sm">{note.content.chiefComplaint}</p>
                            </div>
                            
                            <div className="space-y-1">
                              <h4 className="text-xs font-medium text-muted-foreground">Diagnosis</h4>
                              <div className="flex flex-wrap gap-1">
                                {note.content.diagnosis?.map((diagnosis, index) => (
                                  <Badge key={index} variant="outline">
                                    {diagnosis}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <h4 className="text-xs font-medium text-muted-foreground">Plan</h4>
                              <p className="text-sm whitespace-pre-line">{note.content.plan}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 border-t mt-4 flex justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <FileText className="h-4 w-4 mr-1" />
                            <span>Full note</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              Share
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                      <h3 className="text-lg font-medium mb-1">No consultation notes yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start a new consultation to create notes for this patient
                      </p>
                      <Button 
                        onClick={() => navigate(`/scribe/${patient.id}`)}
                        className="bg-mediscribe-primary hover:bg-mediscribe-primary/90"
                      >
                        <Mic className="mr-2 h-4 w-4" />
                        Start Consult
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="trends">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Weight & BMI Trends</CardTitle>
                        <CardDescription>Patient's weight and BMI over time</CardDescription>
                      </CardHeader>
                      <CardContent className="h-72 flex items-center justify-center">
                        <p className="text-muted-foreground">Weight and BMI chart will appear here</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Lab Results Trends</CardTitle>
                        <CardDescription>Key lab values over time</CardDescription>
                      </CardHeader>
                      <CardContent className="h-72 flex items-center justify-center">
                        <p className="text-muted-foreground">Lab results chart will appear here</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="vitals">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Vital Signs</CardTitle>
                        <CardDescription>Patient's vital measurements over time</CardDescription>
                      </CardHeader>
                      <CardContent className="h-72 flex items-center justify-center">
                        <p className="text-muted-foreground">Vital signs history will appear here</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
