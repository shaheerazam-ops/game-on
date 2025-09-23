import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const SearchFilters = () => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const sports = [
    "Football", "Padel", "Basketball", "Tennis", "Badminton", "Cricket", "Futsal"
  ];

  const toggleSport = (sport: string) => {
    setSelectedSports(prev => 
      prev.includes(sport) 
        ? prev.filter(s => s !== sport)
        : [...prev, sport]
    );
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search venues, sports, or locations..."
          className="pl-10 pr-12 h-12 rounded-xl border-border/50 focus:border-primary"
        />
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Location */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>Near DHA, Karachi, Pakistan</span>
        <Button variant="link" size="sm" className="p-0 h-auto text-primary">
          Change
        </Button>
      </div>

      {/* Sports Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Sports</h3>
        <div className="flex flex-wrap gap-2">
          {sports.map((sport) => (
            <Badge
              key={sport}
              variant={selectedSports.includes(sport) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedSports.includes(sport) 
                  ? "bg-gradient-primary text-primary-foreground border-transparent" 
                  : "hover:border-primary/50"
              }`}
              onClick={() => toggleSport(sport)}
            >
              {sport}
            </Badge>
          ))}
        </div>
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <div className="animate-slide-up space-y-4 pt-4 border-t border-border/50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <select className="w-full p-2 rounded-lg border border-border bg-background">
                <option>Any Price</option>
                <option>$0 - $25</option>
                <option>$25 - $50</option>
                <option>$50 - $100</option>
                <option>$100+</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Distance</label>
              <select className="w-full p-2 rounded-lg border border-border bg-background">
                <option>Any Distance</option>
                <option>Within 1 km</option>
                <option>Within 5 km</option>
                <option>Within 10 km</option>
                <option>Within 25 km</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {["Parking", "WiFi", "Showers", "Lighting", "Equipment"].map((amenity) => (
                <Badge key={amenity} variant="outline" className="cursor-pointer hover:border-primary/50">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;