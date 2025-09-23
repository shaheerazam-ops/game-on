import { Trophy, Calendar, MapPin, Users, Clock, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import footballField from "@/assets/football-field.jpg";
import basketballCourt from "@/assets/basketball-court.jpg";
import padelCourt from "@/assets/padel-court.jpg";

const Tournaments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;
  const upcomingTournaments = [
    {
      id: "1",
      name: "City Football Championship",
      image: footballField,
      sport: "Football",
      date: "Jan 25-27, 2024",
      time: "9:00 AM onwards",
      location: "Champions Football Ground",
      participants: 32,
      maxParticipants: 32,
      prize: "$2,500",
      registrationFee: 25,
      difficulty: "Intermediate",
      status: "Open",
    },
    {
      id: "2",
      name: "Weekend Basketball 3v3",
      image: basketballCourt,
      sport: "Basketball",
      date: "Jan 20, 2024",
      time: "2:00 PM - 8:00 PM",
      location: "Metro Basketball Arena",
      participants: 18,
      maxParticipants: 24,
      prize: "$800",
      registrationFee: 15,
      difficulty: "Beginner",
      status: "Open",
    },
    {
      id: "3",
      name: "Padel Masters Series",
      image: padelCourt,
      sport: "Padel",
      date: "Feb 1-3, 2024",
      time: "All Day",
      location: "Elite Sports Complex",
      participants: 28,
      maxParticipants: 32,
      prize: "$1,200",
      registrationFee: 35,
      difficulty: "Advanced",
      status: "Filling Fast",
    },
  ];

  const registeredTournaments = [
    {
      id: "4",
      name: "New Year Basketball Cup",
      sport: "Basketball",
      date: "Jan 15, 2024",
      status: "Completed",
      position: "2nd Place",
      prize: "$200",
    },
    {
      id: "5",
      name: "Winter Football League",
      sport: "Football", 
      date: "Jan 22, 2024",
      status: "Upcoming",
      registrationDate: "Jan 10, 2024",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-primary text-primary-foreground";
      case "Intermediate": return "bg-secondary text-secondary-foreground";
      case "Advanced": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-primary text-primary-foreground";
      case "Filling Fast": return "bg-accent text-accent-foreground";
      case "Full": return "bg-muted text-muted-foreground";
      case "Completed": return "bg-muted text-muted-foreground";
      case "Upcoming": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const TournamentCard = ({ tournament }: { tournament: any }) => (
    <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={tournament.image} 
          alt={tournament.name}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          <Badge className={getStatusColor(tournament.status)}>
            {tournament.status}
          </Badge>
          <Badge className={getDifficultyColor(tournament.difficulty)}>
            {tournament.difficulty}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
            {tournament.sport}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1 text-center">
            <div className="text-xs text-muted-foreground">Prize Pool</div>
            <div className="text-sm font-bold text-primary">{tournament.prize}</div>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-2">{tournament.name}</h3>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{tournament.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{tournament.time}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{tournament.location}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{tournament.participants}/{tournament.maxParticipants} players</span>
              </div>
              <span className="font-semibold text-primary">${tournament.registrationFee}</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
          />
        </div>

        <Button 
          variant="hero" 
          className="w-full"
          disabled={tournament.status === "Full"}
        >
          <Trophy className="h-4 w-4 mr-2" />
          {tournament.status === "Full" ? "Tournament Full" : "Register Now"}
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16 pb-20 max-w-md mx-auto px-4">
        {/* Header */}
        <div className="py-6">
          <h1 className="text-2xl font-bold mb-2">Tournaments</h1>
          <p className="text-muted-foreground">
            Compete with players across the city
          </p>
        </div>

        {/* Featured Tournament */}
        <div className="mb-6">
          <Card className="overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-bold mb-2">Championship Series</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Join the biggest sports tournament of the year
              </p>
              <Button variant="hero" size="lg">
                View Details
              </Button>
            </div>
          </Card>
        </div>

        {/* Tournaments Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="registered">My Tournaments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </TabsContent>
          
          <TabsContent value="registered" className="space-y-4">
            {registeredTournaments.map((tournament) => (
              <Card key={tournament.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{tournament.name}</h3>
                  <Badge className={getStatusColor(tournament.status)}>
                    {tournament.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">{tournament.sport}</span>
                    <span className="mx-2">•</span>
                    <span>{tournament.date}</span>
                  </div>
                  {tournament.position && (
                    <div className="flex items-center space-x-1 text-primary">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="font-semibold">{tournament.position}</span>
                    </div>
                  )}
                </div>
                {tournament.prize && (
                  <div className="mt-2 text-sm font-semibold text-primary">
                    Won: {tournament.prize}
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Tournament Categories */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Popular Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {["Football", "Basketball", "Padel", "Tennis"].map((sport) => (
              <Card key={sport} className="p-4 text-center cursor-pointer hover:shadow-elevated transition-all duration-300 hover:scale-105">
                <div className="text-lg font-semibold">{sport}</div>
                <div className="text-sm text-muted-foreground">5 tournaments</div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tournaments;