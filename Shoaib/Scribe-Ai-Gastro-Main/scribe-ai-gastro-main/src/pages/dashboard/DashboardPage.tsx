
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, Clock, Calendar, Search, User, FileText } from "lucide-react";
import { mockAppointments } from "@/services/mockData";
import { Appointment } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments] = useState<Appointment[]>(mockAppointments);
  
  // Simulate recent activity for demo
  const recentActivity = [
    { id: 1, type: "note", patient: "Rahul Mehta", time: "10:30 AM", status: "completed" },
    { id: 2, type: "consult", patient: "Priya Sharma", time: "Yesterday", status: "draft" },
    { id: 3, type: "upload", patient: "Arjun Patel", time: "Yesterday", status: "completed" },
  ];
  
  // Stats for demo
  const stats = [
    { title: "Total Patients", value: "52", icon: User, color: "bg-blue-100 text-blue-600" },
    { title: "Appointments Today", value: "5", icon: Calendar, color: "bg-violet-100 text-violet-600" },
    { title: "Saved Time", value: "6hrs", icon: Clock, color: "bg-amber-100 text-amber-600" },
    { title: "Total Notes", value: "128", icon: FileText, color: "bg-emerald-100 text-emerald-600" },
  ];
  
  const formatAppointmentTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleStartScribe = (appointmentId?: string) => {
    navigate(`/scribe${appointmentId ? `/${appointmentId}` : ''}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user?.name?.split(" ")[0] || "Doctor"}
          </p>
        </div>
        <Button 
          onClick={() => handleStartScribe()} 
          className="bg-mediscribe-primary hover:bg-mediscribe-primary/90 flex items-center gap-2"
        >
          <Mic size={18} />
          Start AI Scribe
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`${stat.color} p-2 rounded-full`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Today's Appointments</span>
              <div className="text-sm font-normal text-muted-foreground">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No appointments scheduled for today
                </div>
              ) : (
                appointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors card-hover"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-mediscribe-primary text-white">
                          {appointment.patientName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatAppointmentTime(appointment.date)} • {appointment.reason}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hidden sm:flex" 
                      onClick={() => handleStartScribe(appointment.patientId)}
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Start Scribe
                    </Button>
                  </div>
                ))
              )}
              
              <div className="flex justify-center pt-4">
                <Button variant="outline" className="w-full max-w-xs">
                  View All Appointments
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-7 md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="uploads">Uploads</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4 mt-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className={`p-2 rounded-full ${
                      activity.type === "note" 
                        ? "bg-green-100 text-green-600" 
                        : activity.type === "consult" 
                        ? "bg-blue-100 text-blue-600" 
                        : "bg-amber-100 text-amber-600"
                    }`}>
                      {activity.type === "note" ? (
                        <FileText className="h-4 w-4" />
                      ) : activity.type === "consult" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.type === "note" 
                          ? "Note created" 
                          : activity.type === "consult" 
                          ? "Consultation completed" 
                          : "Recording uploaded"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.patient} • {activity.time}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs"
                    >
                      View
                    </Button>
                  </div>
                ))}
                
                <div className="flex justify-center pt-2">
                  <Button variant="link" size="sm" className="text-mediscribe-primary">
                    View All Activity
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="notes" className="space-y-4 mt-4">
                <div className="text-muted-foreground text-center py-6">
                  Filtered notes activity will appear here
                </div>
              </TabsContent>
              <TabsContent value="uploads" className="space-y-4 mt-4">
                <div className="text-muted-foreground text-center py-6">
                  Filtered uploads activity will appear here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
