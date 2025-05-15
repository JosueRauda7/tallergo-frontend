import Button from "../Button/Button";

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
    <Button disabled={!('geolocation' in navigator)} onClick={handleClick} className="google-maps-button flex bg-sky-400 hover:bg-sky-300 active:bg-sky-500 shadow-neutral-400 shadow">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
      Abrir Waze
    </Button>
  );
}

export default WazeButton;