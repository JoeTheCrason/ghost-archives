import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === "hitman" && password === "18074478") {
      localStorage.setItem("shadowvault_authenticated", "true");
      toast({
        title: "Access Granted",
        description: "Welcome to ShadowVault",
      });
      onLogin();
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-vault-dark via-background to-vault-darker" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--vault-glow)/0.1)_0%,transparent_70%)]" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(hsl(var(--vault-border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--vault-border))_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-card/90 backdrop-blur-sm border-vault-border shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Shield className="h-12 w-12 text-primary" />
              <Lock className="h-6 w-6 text-primary absolute -bottom-1 -right-1" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ShadowVault
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Secure Gaming Archive
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Agent ID</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-secondary/50 border-vault-border focus:border-primary transition-colors"
                placeholder="Enter agent identifier"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Access Code</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-vault-border focus:border-primary transition-colors pr-10"
                  placeholder="Enter access code"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                "Enter Vault"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;