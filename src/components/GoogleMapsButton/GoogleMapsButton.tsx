import Button from "../Button/Button";

interface Props {
  origin: string;
  destination: string;
}

const GoogleMapsButton = ({origin, destination}: Props) => {
  const handleClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <Button disabled={!('geolocation' in navigator)} onClick={handleClick} className="google-maps-button flex bg-amber-400 hover:bg-amber-300 active:bg-amber-500 shadow-neutral-400 shadow">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
      Abrir Google Maps
    </Button>
  );
}

export default GoogleMapsButton;