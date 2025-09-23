import { MapPin, Star, Clock, Wifi, Car, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface VenueCardProps {
  venue: {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    location: string;
    distance: string;
    sport: string;
    price: number;
    amenities: string[];
    availability: "Available" | "Busy" | "Closed";
  };
}

const VenueCard = ({ venue }: VenueCardProps) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-primary text-primary-foreground";
      case "Busy": return "bg-accent text-accent-foreground";
      case "Closed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi": return <Wifi className="h-3 w-3" />;
      case "parking": return <Car className="h-3 w-3" />;
      case "lighting": return <Zap className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] group">
      <div className="relative">
        <img 
          src={venue.image} 
          alt={venue.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className={getAvailabilityColor(venue.availability)}>
            <Clock className="h-3 w-3 mr-1" />
            {venue.availability}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
            {venue.sport}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-sm font-bold text-primary">${venue.price}</span>
            <span className="text-xs text-muted-foreground">/hour</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {venue.name}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{venue.rating}</span>
              <span>({venue.reviews})</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{venue.distance}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-1">
          {venue.location}
        </p>

        {venue.amenities.length > 0 && (
          <div className="flex items-center space-x-2">
            {venue.amenities.slice(0, 3).map((amenity, index) => (
              <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {venue.amenities.length > 3 && (
              <span className="text-xs text-muted-foreground">+{venue.amenities.length - 3}</span>
            )}
          </div>
        )}

        <Button 
          className="w-full bg-gradient-primary hover:bg-gradient-secondary transition-all duration-300"
          size="sm"
          onClick={() => setShowBookingModal(true)}
        >
          Book Now
        </Button>
      </div>

      <BookingModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        venue={{
          name: venue.name,
          image: venue.image,
          location: venue.location,
          price: venue.price,
          sport: venue.sport,
        }}
      />
    </Card>
  );
};

export default VenueCard;