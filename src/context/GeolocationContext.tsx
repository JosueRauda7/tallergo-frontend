import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export interface GeolocationContextType {
  latitude: number;
  longitude: number;
  getCurrentPosition: () => void;
}

export const GeolocationContext = createContext<GeolocationContextType>({
  latitude: 0,
  longitude: 0,
  getCurrentPosition: () => {},
});

export const GeolocationContextProvider = ({children}: Props) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const getCurrentPosition = () => {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  };

  return (
    <GeolocationContext.Provider value={{ latitude, longitude, getCurrentPosition }}>
      {children}
    </GeolocationContext.Provider>
  );
}