
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  User, 
  Plus, 
  Filter, 
  ChevronDown,
  ArrowUpDown,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockPatients } from "@/services/mockData";
import { Patient } from "@/types";
import { useNavigate } from "react-router-dom";

const PatientsListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [patients] = useState<Patient[]>(mockPatients);
  const [sortBy, setSortBy] = useState<string>("lastVisit");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Sort and filter patients
  const filteredPatients = patients
    .filter(patient => 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.medicalHistory?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "age") {
        return sortDirection === "asc"
          ? a.age - b.age
          : b.age - a.age;
      } else if (sortBy === "lastVisit") {
        if (!a.lastVisit) return sortDirection === "asc" ? -1 : 1;
        if (!b.lastVisit) return sortDirection === "asc" ? 1 : -1;
        return sortDirection === "asc"
          ? a.lastVisit.getTime() - b.lastVisit.getTime()
          : b.lastVisit.getTime() - a.lastVisit.getTime();
      }
      return 0;
    });
  
  // Toggle sort direction
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };
  
  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return date.toLocaleDateString();
  };
  
  // Navigate to patient profile
  const handlePatientClick = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };
  
  // Start scribe for patient
  const handleStartScribe = (patientId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/scribe/${patientId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
        <Button className="bg-mediscribe-primary hover:bg-mediscribe-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Patient
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    All Patients
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Recent Visits
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Obesity Patients
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    GI Patients
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => toggleSort("name")}
                      >
                        <span>Name</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => toggleSort("age")}
                      >
                        <span>Age</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Medical History</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => toggleSort("lastVisit")}
                      >
                        <span>Last Visit</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredPatients.length === 0 ? (
                    <tr className="border-b transition-colors">
                      <td colSpan={5} className="p-4 align-middle text-center text-muted-foreground">
                        No patients found
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((patient) => (
                      <tr 
                        key={patient.id}
                        className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
                        onClick={() => handlePatientClick(patient.id)}
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-mediscribe-primary flex items-center justify-center text-white mr-3">
                              {patient.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-xs text-muted-foreground">{patient.gender}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{patient.age}</td>
                        <td className="p-4 align-middle">{patient.medicalHistory}</td>
                        <td className="p-4 align-middle">{formatDate(patient.lastVisit)}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={(e) => handleStartScribe(patient.id, e)}
                            >
                              <Mic className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/patients/${patient.id}`);
                              }}
                            >
                              <User className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredPatients.length}</span> of{" "}
              <span className="font-medium">{patients.length}</span> patients
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientsListPage;
