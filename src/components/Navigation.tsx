import { Search, MapPin, Calendar, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState(
    location.pathname === "/profile" ? "profile" :
    location.pathname === "/bookings" ? "bookings" : "home"
  );

  const navItems = [
    { id: "home", icon: Search, label: "Discover", path: "/" },
    { id: "map", icon: MapPin, label: "Map", path: "/" },
    { id: "bookings", icon: Calendar, label: "Bookings", path: "/bookings" },
    { id: "profile", icon: User, label: "Profile", path: "/profile" },
  ];

  const handleNavigation = (item: any) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">G</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Game-On
            </h1>
          </div>
          {user ? (
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/auth')}
              className="rounded-lg"
            >
              Login
            </Button>
          )}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto bg-card/95 backdrop-blur-sm border-t border-border/50 px-4 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${activeTab === item.id ? "scale-110" : ""} transition-transform duration-200`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;