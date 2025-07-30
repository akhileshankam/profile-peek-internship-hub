
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import locationSuggestionsData from "@/data/locations.json";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

const LocationAutocomplete = ({ value, onChange, placeholder = "Enter location...", label, disabled }: LocationAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locationSuggestions: string[] = locationSuggestionsData;


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.length > 0) {
      const filtered = locationSuggestions.filter(location =>
        location.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 15); // Increased to 15 suggestions for better coverage
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (value.length > 0) {
      const filtered = locationSuggestions.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 15);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  return (
    <div className="space-y-2" ref={dropdownRef}>
      {label && <Label>{label}</Label>}
      <div className="relative">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            ref={inputRef}
            value={value}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="pl-10"
            disabled={disabled}
          />
        </div>
        
        {showSuggestions && filteredSuggestions.length > 0 && !disabled && (
          <Card className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-white border shadow-lg">
            <CardContent className="p-0">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-b-0 flex items-center gap-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <MapPin className="h-3 w-3 text-gray-400" />
                  {suggestion}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LocationAutocomplete;
