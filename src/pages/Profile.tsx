import { User, Settings, Calendar, Star, Trophy, CreditCard, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";

const Profile = () => {
  const userStats = [
    { icon: Calendar, label: "Bookings", value: "24", color: "text-primary" },
    { icon: Star, label: "Average Rating", value: "4.8", color: "text-yellow-500" },
    { icon: Trophy, label: "Sports Played", value: "5", color: "text-accent" },
  ];

  const recentBookings = [
    {
      id: "1",
      venue: "Elite Sports Complex",
      sport: "Padel",
      date: "Today, 6:00 PM",
      status: "Confirmed",
      price: 35,
    },
    {
      id: "2", 
      venue: "Champions Football Ground",
      sport: "Football",
      date: "Tomorrow, 8:00 AM",
      status: "Pending",
      price: 45,
    },
    {
      id: "3",
      venue: "Metro Basketball Arena", 
      sport: "Basketball",
      date: "Jan 20, 7:30 PM",
      status: "Completed",
      price: 28,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-primary text-primary-foreground";
      case "Pending": return "bg-accent text-accent-foreground";
      case "Completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16 pb-20 max-w-md mx-auto px-4">
        {/* Profile Header */}
        <div className="py-6">
          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
              JS
            </div>
            <h1 className="text-2xl font-bold mb-1">John Smith</h1>
            <p className="text-muted-foreground mb-4">Active Player Since 2023</p>
            
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star 
                  key={star} 
                  className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">(4.8)</span>
            </div>

            <Badge className="bg-gradient-primary text-primary-foreground">
              <Trophy className="h-3 w-3 mr-1" />
              Premium Player
            </Badge>
          </Card>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Your Stats</h2>
          <div className="grid grid-cols-3 gap-3">
            {userStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-4 text-center">
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <Card key={booking.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{booking.venue}</h3>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">{booking.sport}</span>
                    <span className="mx-2">•</span>
                    <span>{booking.date}</span>
                  </div>
                  <span className="font-semibold text-primary">${booking.price}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Settings className="h-4 w-4 mr-3" />
              Account Settings
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <CreditCard className="h-4 w-4 mr-3" />
              Payment Methods
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Bell className="h-4 w-4 mr-3" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Achievements</h2>
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">First Booking</h3>
                  <p className="text-sm text-muted-foreground">Completed your first booking</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                  <Star className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Loyal Player</h3>
                  <p className="text-sm text-muted-foreground">Made 10+ bookings</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;