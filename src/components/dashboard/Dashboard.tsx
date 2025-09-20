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
    } else {
      // Initialize with default game links - all categorized as "Proxies and Games"
      const defaultGameLinks: WebsiteLink[] = [
        { id: "1", title: "Xen Desmos", url: "https://xen.desmos.lol.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "2", title: "Xen Google Drive", url: "https://xen.googledrive.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "3", title: "Xen Prodigy", url: "https://xen.prodigy.it.com.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "4", title: "Xen Student Vue", url: "https://xen.studentvue.my.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "5", title: "NB Desmos Graphing", url: "https://nb.desmosgraphing.xyz.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "6", title: "NB GoGuardian", url: "https://nb.goguardian.pro.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "7", title: "NB Prodigy", url: "https://nb.prodigy.it.com.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "8", title: "NB Stay in School", url: "https://nb.stayinschooleducation.org.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "9", title: "TB DeltaMath", url: "https://tb.deltamath.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "10", title: "TB Desmos", url: "https://tb.desmos.lol.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "11", title: "TB EdPuzzle", url: "https://tb.edpuzzle.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "12", title: "TB GoGuardian", url: "https://tb.goguardian.pro.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "13", title: "TB Google Drive", url: "https://tb.googledrive.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "14", title: "TB Prodigy", url: "https://tb.prodigy.it.com.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "15", title: "TB Student Vue", url: "https://tb.studentvue.my.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "16", title: "DDX DeltaMath", url: "https://ddx.deltamath.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "17", title: "DDX Desmos Graphing", url: "https://ddx.desmosgraphing.xyz.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "18", title: "DDX EdPuzzle", url: "https://ddx.edpuzzle.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "19", title: "DDX GoGuardian", url: "https://ddx.goguardian.pro.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "20", title: "DDX Google Drive", url: "https://ddx.googledrive.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "21", title: "DDX Nearpod", url: "https://ddx.nearpod.lol.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "22", title: "DDX Stay in School", url: "https://ddx.stayinschooleducation.org.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "23", title: "DDX Student Vue", url: "https://ddx.studentvue.my.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "24", title: "Lunar DeltaMath", url: "https://lunar.deltamath.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "25", title: "Lunar Desmos", url: "https://lunar.desmos.lol.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "26", title: "Lunar EdPuzzle", url: "https://lunar.edpuzzle.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "27", title: "Lunar GoGuardian", url: "https://lunar.goguardian.pro.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "28", title: "Lunar Google Drive", url: "https://lunar.googledrive.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "29", title: "Lunar Nearpod", url: "https://lunar.nearpod.lol.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "30", title: "Lunar Prodigy", url: "https://lunar.prodigy.it.com.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "31", title: "Lunar Stay in School", url: "https://lunar.stayinschooleducation.org.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "32", title: "Lunar Student Vue", url: "https://lunar.studentvue.my.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "33", title: "Space DeltaMath", url: "https://space.deltamath.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "34", title: "Space Desmos Graphing", url: "https://space.desmosgraphing.xyz.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "35", title: "Space EdPuzzle", url: "https://space.edpuzzle.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "36", title: "Space GoGuardian", url: "https://space.goguardian.pro.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "37", title: "Space Google Drive", url: "https://space.googledrive.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "38", title: "Space Nearpod", url: "https://space.nearpod.lol.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "39", title: "Space Prodigy", url: "https://space.prodigy.it.com.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "40", title: "Space Stay in School", url: "https://space.stayinschooleducation.org.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "41", title: "Space Student Vue", url: "https://space.studentvue.my.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "42", title: "Super GIS Fire", url: "https://supergisfire.com.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "43", title: "Pete Zahbare", url: "https://petezahbare.adidasnmdcitysock.com.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "44", title: "Waves Lat", url: "https://waves.lat.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "45", title: "Wis Sentt", url: "https://wis.sentt.lol.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "46", title: "Macha", url: "https://macha.icu.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "47", title: "Use Waves", url: "https://usewaves.site.cdn.cloudflare.net", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "48", title: "Africa IT Group", url: "https://africa.itafricagroup.com", category: "Proxies and Games", addedAt: new Date().toISOString() },
        { id: "49", title: "Suicide Hotline Prevention", url: "https://suicidehotlineprevention.itafricagroup.com", category: "Proxies and Games", addedAt: new Date().toISOString() }
      ];
      setGameLinks(defaultGameLinks);
      localStorage.setItem("vaultvision_games", JSON.stringify(defaultGameLinks));
    }
    
    if (storedApps) {
      setAppLinks(JSON.parse(storedApps));
    } else {
      // Initialize with Security Scope app
      const defaultApps: WebsiteLink[] = [
        { 
          id: "security-scope-1", 
          title: "Security Scope", 
          url: "#", 
          category: "Security", 
          addedAt: new Date().toISOString()
        }
      ];
      setAppLinks(defaultApps);
      localStorage.setItem("vaultvision_apps", JSON.stringify(defaultApps));
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
      <div className="grid grid-cols-1 gap-6">
        {/* Links List */}
        <Card className="bg-card/90 border-vault-border">
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
                      {type === 'apps' ? (
                        link.id === "security-scope-1" ? (
                          <div className="flex items-center gap-3 p-3 bg-black rounded-md border border-green-500/30">
                            <div className="relative">
                              <Shield className="h-8 w-8 text-green-500" />
                              <Lock className="h-4 w-4 text-green-500 absolute -bottom-0.5 -right-0.5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-400">{link.title}</p>
                              <p className="text-xs text-green-300">Professional domain security analysis powered by Lightspeed and FortiGuard filtering systems. Instantly verify domain safety and categorization.</p>
                            </div>
                            <Button 
                              onClick={() => window.open(link.url, '_blank')}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Open
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                              <Smartphone className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{link.title}</p>
                            </div>
                            <Button 
                              onClick={() => window.open(link.url, '_blank')}
                              className="bg-primary hover:bg-primary/90"
                            >
                              Open
                            </Button>
                          </div>
                        )
                      ) : (
                        <p className="text-sm text-muted-foreground truncate">
                          {link.url}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Stored: {new Date(link.addedAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => link.id === "security-scope-1" ? null : window.open(link.url, '_blank')}
                        className="border-primary/20 hover:bg-primary/10"
                        disabled={link.id === "security-scope-1"}
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
        {type === 'games' && categories.length > 0 && (
          <Card className="bg-card/90 border-vault-border">
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