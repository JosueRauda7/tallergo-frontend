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
    <button disabled={!('geolocation' in navigator)} onClick={handleClick} className="google-maps-button">
      Ir con Google Maps
    </button>
  );
}

export default GoogleMapsButton;