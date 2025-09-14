import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Search, 
  LogOut,
  Gamepad2,
  Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameLink {
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
  const [gameLinks, setGameLinks] = useState<GameLink[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("incognitobox_games");
    if (stored) {
      setGameLinks(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (links: GameLink[]) => {
    localStorage.setItem("incognitobox_games", JSON.stringify(links));
    setGameLinks(links);
  };

  const addGameLink = () => {
    if (!newTitle || !newUrl) {
      toast({
        title: "Incomplete Data",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newLink: GameLink = {
      id: Date.now().toString(),
      title: newTitle,
      url: newUrl,
      category: newCategory || "Uncategorized",
      addedAt: new Date().toISOString(),
    };

    const updatedLinks = [...gameLinks, newLink];
    saveToStorage(updatedLinks);

    setNewTitle("");
    setNewUrl("");
    setNewCategory("");

    toast({
      title: "Game Added",
      description: `${newTitle} has been secured in the box`,
    });
  };

  const removeGameLink = (id: string) => {
    const updatedLinks = gameLinks.filter(link => link.id !== id);
    saveToStorage(updatedLinks);
    toast({
      title: "Game Removed",
      description: "Link has been deleted from the box",
    });
  };

  const filteredGames = gameLinks.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(gameLinks.map(game => game.category)));

  const handleLogout = () => {
    localStorage.removeItem("incognitobox_authenticated");
    onLogout();
  };

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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                IncognitoBox
              </h1>
              <p className="text-sm text-muted-foreground">Anonymous Gaming Archive</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Gamepad2 className="h-3 w-3 mr-1" />
              {gameLinks.length} Games Secured
            </Badge>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-vault-border hover:bg-destructive/10 hover:border-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit Box
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add New Game */}
          <Card className="lg:col-span-1 bg-card/90 border-vault-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Add New Game
              </CardTitle>
              <CardDescription>
                Secure a new unblocked game link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Game Title</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter game name"
                  className="bg-secondary/50 border-vault-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">Game URL</Label>
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
                  placeholder="Action, Puzzle, etc."
                  className="bg-secondary/50 border-vault-border"
                />
              </div>
              
              <Button 
                onClick={addGameLink} 
                className="w-full bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Store Game
              </Button>
            </CardContent>
          </Card>

          {/* Games List */}
          <Card className="lg:col-span-2 bg-card/90 border-vault-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Stored Games
                </CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search games..."
                    className="pl-10 bg-secondary/50 border-vault-border"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredGames.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Gamepad2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  {gameLinks.length === 0 ? (
                    <p>No games stored yet. Add your first game to get started.</p>
                  ) : (
                    <p>No games match your search criteria.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredGames.map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-vault-border hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-foreground">{game.title}</h3>
                          <Badge variant="outline" className="text-xs border-vault-border">
                            {game.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {game.url}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Stored: {new Date(game.addedAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(game.url, '_blank')}
                          className="border-primary/20 hover:bg-primary/10"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeGameLink(game.id)}
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
        </div>

        {/* Categories Overview */}
        {categories.length > 0 && (
          <Card className="mt-6 bg-card/90 border-vault-border">
            <CardHeader>
              <CardTitle>Categories Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const count = gameLinks.filter(game => game.category === category).length;
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
    </div>
  );
};

export default Dashboard;