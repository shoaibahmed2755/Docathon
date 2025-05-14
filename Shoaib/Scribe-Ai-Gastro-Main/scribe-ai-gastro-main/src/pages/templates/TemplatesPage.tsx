
import { useState } from "react";
import { Search, Filter, ChevronDown, Plus, FileText, Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { mockTemplates } from "@/services/mockData";
import { Template } from "@/types";
import { toast } from "sonner";

const TemplatesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    // Filter by category
    if (selectedCategory && template.category !== selectedCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Toggle favorite status
  const toggleFavorite = (templateId: string) => {
    setTemplates(prev => 
      prev.map(template => 
        template.id === templateId
          ? { ...template, isFavorite: !template.isFavorite }
          : template
      )
    );
    
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast.success(`${template.isFavorite ? 'Removed from' : 'Added to'} favorites`);
    }
  };
  
  // Delete template
  const deleteTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setTemplates(prev => prev.filter(template => template.id !== templateId));
      toast.success(`Template "${template.name}" deleted`);
    }
  };
  
  const previewTemplate = () => {
    toast.info("Template preview functionality coming soon");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Templates</h2>
          <p className="text-muted-foreground">
            Manage your note templates for faster documentation
          </p>
        </div>
        <Button className="bg-mediscribe-primary hover:bg-mediscribe-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Tabs 
            defaultValue="all"
            className="flex-grow"
            onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="GI">GI</TabsTrigger>
              <TabsTrigger value="obesity">Obesity</TabsTrigger>
              <TabsTrigger value="procedure">Procedures</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="mr-2 h-4 w-4" />
                Sort
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Name (A to Z)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Name (Z to A)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Favorites First
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Recently Used
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {filteredTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4 opacity-30" />
          <h3 className="text-xl font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? "Try a different search term"
              : "Create your first template to get started"
            }
          </p>
          <Button className="bg-mediscribe-primary hover:bg-mediscribe-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{template.name}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`h-8 w-8 ${template.isFavorite ? "text-yellow-500 hover:text-yellow-600" : "text-muted-foreground hover:text-foreground"}`}
                    onClick={() => toggleFavorite(template.id)}
                  >
                    <Star className="h-5 w-5" fill={template.isFavorite ? "currentColor" : "none"} />
                  </Button>
                </CardTitle>
                <CardDescription>
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {template.category}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-muted-foreground">
                      Chief Complaint
                    </h4>
                    <p className="text-sm line-clamp-2">
                      {template.content.chiefComplaint || "Not specified"}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-muted-foreground">
                      Includes
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        History
                      </span>
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        Examination
                      </span>
                      {template.content.plan && (
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          Plan
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t mt-2 flex justify-between">
                <Button variant="outline" size="sm" onClick={previewTemplate}>
                  Preview
                </Button>
                
                <div className="space-x-1">
                  <Button variant="outline" size="sm">
                    Use
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => deleteTemplate(template.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;
