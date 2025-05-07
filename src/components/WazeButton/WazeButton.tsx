interface Props {
  latitude: number;
  longitude: number;
}

const WazeButton = ({latitude, longitude}: Props) => {
  const handleClick = () => {
    const url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    window.open(url, '_blank');
  };

  return (
    <button disabled={!('geolocation' in navigator)} onClick={handleClick} className="google-maps-button">
      Ir con Waze
    </button>
  );
}

export default WazeButton;