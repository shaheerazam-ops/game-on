import { TrendingUp, Users, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SearchFilters from "@/components/SearchFilters";
import VenueCard from "@/components/VenueCard";
import heroImage from "@/assets/hero-sports.jpg";
import padelCourt from "@/assets/padel-court.jpg";
import footballField from "@/assets/football-field.jpg";
import basketballCourt from "@/assets/basketball-court.jpg";

const Home = () => {
  const navigate = useNavigate();
  // Mock data for venues
  const featuredVenues = [
    {
      id: "1",
      name: "Elite Sports Complex",
      image: padelCourt,
      rating: 4.8,
      reviews: 124,
      location: "Downtown Sports District",
      distance: "0.8 km",
      sport: "Padel",
      price: 35,
      amenities: ["WiFi", "Parking", "Lighting"],
      availability: "Available" as const,
    },
    {
      id: "2", 
      name: "Champions Football Ground",
      image: footballField,
      rating: 4.6,
      reviews: 89,
      location: "Riverside Park",
      distance: "1.2 km",
      sport: "Football",
      price: 45,
      amenities: ["Parking", "Showers", "Equipment"],
      availability: "Busy" as const,
    },
    {
      id: "3",
      name: "Metro Basketball Arena",
      image: basketballCourt,
      rating: 4.9,
      reviews: 156,
      location: "City Center",
      distance: "0.5 km", 
      sport: "Basketball",
      price: 28,
      amenities: ["WiFi", "Lighting", "Showers"],
      availability: "Available" as const,
    },
  ];

  const stats = [
    { icon: Users, label: "Active Users", value: "50K+" },
    { icon: Award, label: "Venues", value: "500+" },
    { icon: TrendingUp, label: "Bookings", value: "10K+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Sports facilities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
        </div>
        
        <div className="relative max-w-md mx-auto px-4 py-12 text-center space-y-6">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Book Your Game
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Discover and book the best sports facilities in your city
            </p>
          </div>
          
          <div className="animate-slide-up">
            <Button size="lg" className="bg-gradient-primary hover:bg-gradient-secondary shadow-glow">
              Start Exploring
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 animate-scale-in">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-4 text-center bg-card/80 backdrop-blur-sm border-border/50">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-md mx-auto px-4 py-6">
        <SearchFilters />
      </section>

      {/* Featured Venues */}
      <section className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Featured Venues</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {featuredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-md mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="p-4 text-center cursor-pointer hover:shadow-elevated transition-all duration-300 hover:scale-105 bg-gradient-primary text-primary-foreground"
            onClick={() => navigate("/tournaments")}
          >
            <div className="text-lg font-semibold">Tournaments</div>
            <div className="text-sm opacity-90">Join competitions</div>
          </Card>
          <Card className="p-4 text-center cursor-pointer hover:shadow-elevated transition-all duration-300 hover:scale-105 bg-gradient-secondary text-secondary-foreground">
            <div className="text-lg font-semibold">Find Partner</div>
            <div className="text-sm opacity-90">Connect with players</div>
          </Card>
        </div>
      </section>

      {/* Bottom Spacing for Navigation */}
      <div className="h-20" />
    </div>
  );
};

export default Home;