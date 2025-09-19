import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Search, 
  LogOut,
  Gamepad2,
  Lock,
  Smartphone,
  ShoppingCart,
  FileText,
  Info,
  Megaphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebsiteLink {
  id: string;
  title: string;
  url: string;
  category: string;
  addedAt: string;
}

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [gameLinks, setGameLinks] = useState<WebsiteLink[]>([]);
  const [appLinks, setAppLinks] = useState<WebsiteLink[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("announcements");
  const { toast } = useToast();

  useEffect(() => {
    const storedGames = localStorage.getItem("vaultvision_games");
    const storedApps = localStorage.getItem("vaultvision_apps");
    if (storedGames) {
      setGameLinks(JSON.parse(storedGames));
    }
    if (storedApps) {
      setAppLinks(JSON.parse(storedApps));
    }
  }, []);

  const saveToStorage = (links: WebsiteLink[], type: 'games' | 'apps') => {
    localStorage.setItem(`vaultvision_${type}`, JSON.stringify(links));
    if (type === 'games') {
      setGameLinks(links);
    } else {
      setAppLinks(links);
    }
  };

  const addWebsiteLink = (type: 'games' | 'apps') => {
    if (!newTitle || !newUrl) {
      toast({
        title: "Incomplete Data",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newLink: WebsiteLink = {
      id: Date.now().toString(),
      title: newTitle,
      url: newUrl,
      category: newCategory || "Uncategorized",
      addedAt: new Date().toISOString(),
    };

    const currentLinks = type === 'games' ? gameLinks : appLinks;
    const updatedLinks = [...currentLinks, newLink];
    saveToStorage(updatedLinks, type);

    setNewTitle("");
    setNewUrl("");
    setNewCategory("");

    toast({
      title: `${type === 'games' ? 'Game' : 'App'} Added`,
      description: `${newTitle} has been secured in the vault`,
    });
  };

  const removeWebsiteLink = (id: string, type: 'games' | 'apps') => {
    const currentLinks = type === 'games' ? gameLinks : appLinks;
    const updatedLinks = currentLinks.filter(link => link.id !== id);
    saveToStorage(updatedLinks, type);
    toast({
      title: `${type === 'games' ? 'Game' : 'App'} Removed`,
      description: "Link has been deleted from the vault",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("vaultvision_authenticated");
    onLogout();
  };

  const LinkManagementSection = ({ links, type }: { links: WebsiteLink[], type: 'games' | 'apps' }) => {
    const filteredLinks = links.filter(link =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = Array.from(new Set(links.map(link => link.category)));

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add New Link */}
        <Card className="lg:col-span-1 bg-card/90 border-vault-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add New {type === 'games' ? 'Game' : 'App'}
            </CardTitle>
            <CardDescription>
              Secure a new unblocked {type === 'games' ? 'game' : 'app'} link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">{type === 'games' ? 'Game' : 'App'} Title</Label>
              <Input
                id="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={`Enter ${type === 'games' ? 'game' : 'app'} name`}
                className="bg-secondary/50 border-vault-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">{type === 'games' ? 'Game' : 'App'} URL</Label>
              <Input
                id="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://..."
                className="bg-secondary/50 border-vault-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder={type === 'games' ? "Action, Puzzle, etc." : "Productivity, Social, etc."}
                className="bg-secondary/50 border-vault-border"
              />
            </div>
            
            <Button 
              onClick={() => addWebsiteLink(type)} 
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Store {type === 'games' ? 'Game' : 'App'}
            </Button>
          </CardContent>
        </Card>

        {/* Links List */}
        <Card className="lg:col-span-2 bg-card/90 border-vault-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {type === 'games' ? <Gamepad2 className="h-5 w-5 text-primary" /> : <Smartphone className="h-5 w-5 text-primary" />}
                Stored {type === 'games' ? 'Games' : 'Apps'}
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Search ${type}...`}
                  className="pl-10 bg-secondary/50 border-vault-border"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredLinks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {type === 'games' ? <Gamepad2 className="h-12 w-12 mx-auto mb-4 opacity-50" /> : <Smartphone className="h-12 w-12 mx-auto mb-4 opacity-50" />}
                {links.length === 0 ? (
                  <p>No {type} stored yet. Add your first {type === 'games' ? 'game' : 'app'} to get started.</p>
                ) : (
                  <p>No {type} match your search criteria.</p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLinks.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-vault-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-foreground">{link.title}</h3>
                        <Badge variant="outline" className="text-xs border-vault-border">
                          {link.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {link.url}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Stored: {new Date(link.addedAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(link.url, '_blank')}
                        className="border-primary/20 hover:bg-primary/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeWebsiteLink(link.id, type)}
                        className="border-destructive/20 hover:bg-destructive/10 hover:border-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories Overview */}
        {categories.length > 0 && (
          <Card className="lg:col-span-3 bg-card/90 border-vault-border">
            <CardHeader>
              <CardTitle>Categories Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const count = links.filter(link => link.category === category).length;
                  return (
                    <Badge 
                      key={category} 
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {category} ({count})
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const PlaceholderSection = ({ title, description }: { title: string, description: string }) => (
    <Card className="bg-card/90 border-vault-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <p>This section is under development.</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <Lock className="h-4 w-4 text-primary absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-mono">
                VVV
              </h1>
              <p className="text-sm text-muted-foreground">Vault Vision Version 1</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Shield className="h-3 w-3 mr-1" />
              {gameLinks.length + appLinks.length} Links Secured
            </Badge>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-vault-border hover:bg-destructive/10 hover:border-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit Vault
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-secondary/50 border border-vault-border">
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Games
            </TabsTrigger>
            <TabsTrigger value="apps" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Apps
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Shop
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Policies
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="mt-6">
            <PlaceholderSection 
              title="System Announcements" 
              description="Latest updates and important notices from Vault Vision"
            />
          </TabsContent>

          <TabsContent value="games" className="mt-6">
            <LinkManagementSection links={gameLinks} type="games" />
          </TabsContent>

          <TabsContent value="apps" className="mt-6">
            <LinkManagementSection links={appLinks} type="apps" />
          </TabsContent>

          <TabsContent value="shop" className="mt-6">
            <PlaceholderSection 
              title="Vault Shop" 
              description="Premium features and exclusive content"
            />
          </TabsContent>

          <TabsContent value="policies" className="mt-6">
            <PlaceholderSection 
              title="Vault Policies" 
              description="Terms of service, privacy policy, and usage guidelines"
            />
          </TabsContent>

          <TabsContent value="info" className="mt-6">
            <PlaceholderSection 
              title="Vault Information" 
              description="Help center, FAQ, and contact information"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;