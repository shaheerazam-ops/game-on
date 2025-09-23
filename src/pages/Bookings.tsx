import { Calendar, Clock, MapPin, Filter, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import padelCourt from "@/assets/padel-court.jpg";
import footballField from "@/assets/football-field.jpg";
import basketballCourt from "@/assets/basketball-court.jpg";

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;
  const upcomingBookings = [
    {
      id: "1",
      venue: "Elite Sports Complex",
      image: padelCourt,
      sport: "Padel",
      date: "Today",
      time: "6:00 PM - 7:00 PM",
      location: "DHA Phase 5, Karachi",
      price: 3500,
      status: "Confirmed",
      players: 4,
    },
    {
      id: "2",
      venue: "Champions Football Ground", 
      image: footballField,
      sport: "Football",
      date: "Tomorrow",
      time: "8:00 AM - 9:00 AM",
      location: "Clifton Beach, Karachi",
      price: 4500,
      status: "Pending",
      players: 6,
    },
  ];

  const pastBookings = [
    {
      id: "3",
      venue: "Metro Basketball Arena",
      image: basketballCourt,
      sport: "Basketball", 
      date: "Jan 15, 2024",
      time: "7:30 PM - 8:30 PM",
      location: "Gulshan-e-Iqbal, Karachi",
      price: 2800,
      status: "Completed",
      players: 3,
      rating: 5,
    },
    {
      id: "4",
      venue: "Elite Sports Complex",
      image: padelCourt,
      sport: "Padel",
      date: "Jan 12, 2024", 
      time: "5:00 PM - 6:00 PM",
      location: "DHA Phase 5, Karachi",
      price: 3500,
      status: "Completed",
      players: 4,
      rating: 4,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-primary text-primary-foreground";
      case "Pending": return "bg-accent text-accent-foreground";
      case "Completed": return "bg-muted text-muted-foreground";
      case "Cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const BookingCard = ({ booking, showActions = true }: { booking: any; showActions?: boolean }) => (
    <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
      <div className="flex">
        <div className="relative w-24 h-24 flex-shrink-0">
          <img 
            src={booking.image} 
            alt={booking.venue}
            className="w-full h-full object-cover"
          />
          <Badge className={`absolute top-1 right-1 text-xs ${getStatusColor(booking.status)}`}>
            {booking.status}
          </Badge>
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-sm">{booking.venue}</h3>
              <Badge variant="outline" className="text-xs mt-1">
                {booking.sport}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-primary">PKR {booking.price}</div>
              <div className="text-xs text-muted-foreground">{booking.players} players</div>
            </div>
          </div>
          
          <div className="space-y-1 text-xs text-muted-foreground mb-3">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{booking.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate">{booking.location}</span>
            </div>
          </div>

          {showActions && (
            <div className="flex space-x-2">
              {booking.status === "Confirmed" && (
                <>
                  <Button variant="outline" size="sm" className="text-xs">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs text-destructive">
                    Cancel
                  </Button>
                </>
              )}
              {booking.status === "Completed" && !booking.rating && (
                <Button variant="outline" size="sm" className="text-xs">
                  Rate
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16 pb-20 max-w-md mx-auto px-4">
        {/* Header */}
        <div className="py-6">
          <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
          
          {/* Search and Filter */}
          <div className="flex space-x-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search bookings..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No upcoming bookings</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to play? Book your next game now!
                </p>
                <Button variant="hero">
                  Explore Venues
                </Button>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">This Month</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center">
              <div className="text-lg font-bold text-primary">6</div>
              <div className="text-xs text-muted-foreground">Games Played</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-lg font-bold text-secondary">PKR 18,000</div>
              <div className="text-xs text-muted-foreground">Total Spent</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-lg font-bold text-accent">4.8</div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookings;