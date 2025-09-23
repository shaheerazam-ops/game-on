import { useState } from "react";
import { Calendar, Clock, CreditCard, MapPin, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: {
    name: string;
    image: string;
    location: string;
    price: number;
    sport: string;
  };
}

const BookingModal = ({ isOpen, onClose, venue }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(1);
  const [players, setPlayers] = useState<number>(1);

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  const dates = [
    { date: "2024-01-15", day: "Today", available: true },
    { date: "2024-01-16", day: "Tomorrow", available: true },
    { date: "2024-01-17", day: "Wed", available: true },
    { date: "2024-01-18", day: "Thu", available: false },
    { date: "2024-01-19", day: "Fri", available: true },
  ];

  const totalPrice = venue.price * duration;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book Your Game</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Venue Info */}
          <Card className="overflow-hidden">
            <div className="relative h-32">
              <img 
                src={venue.image} 
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-semibold">{venue.name}</h3>
                <div className="flex items-center space-x-1 text-sm opacity-90">
                  <MapPin className="h-3 w-3" />
                  <span>{venue.location}</span>
                </div>
              </div>
              <Badge className="absolute top-3 right-3 bg-gradient-primary">
                {venue.sport}
              </Badge>
            </div>
          </Card>

          {/* Date Selection */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              Select Date
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {dates.map((dateObj) => (
                <button
                  key={dateObj.date}
                  onClick={() => dateObj.available && setSelectedDate(dateObj.date)}
                  disabled={!dateObj.available}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedDate === dateObj.date
                      ? "bg-gradient-primary text-primary-foreground"
                      : dateObj.available
                      ? "bg-muted hover:bg-muted/80 text-foreground"
                      : "bg-muted/50 text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <div>{dateObj.day}</div>
                  <div className="text-xs">{dateObj.date.split('-')[2]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              Select Time
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTime === time
                      ? "bg-gradient-secondary text-secondary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Duration & Players */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold mb-2 block">Duration (hours)</label>
              <select 
                value={duration} 
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-border bg-background"
              >
                <option value={1}>1 hour</option>
                <option value={2}>2 hours</option>
                <option value={3}>3 hours</option>
              </select>
            </div>
            <div>
              <label className="font-semibold mb-2 block flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Players
              </label>
              <select 
                value={players} 
                onChange={(e) => setPlayers(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-border bg-background"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} player{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <Separator />

          {/* Booking Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Court rental ({duration}h)</span>
                <span>${venue.price} × {duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>$2.99</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">${totalPrice + 2.99}</span>
              </div>
            </div>
          </div>

          {/* Payment & Book */}
          <div className="space-y-3">
            <Button 
              variant="hero" 
              size="lg"
              className="w-full"
              disabled={!selectedDate || !selectedTime}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Pay & Book Now
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;