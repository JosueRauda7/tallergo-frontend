interface Props {
  title: string;
  description: string;
  distance: number;
  businessName: string;
  isService?: boolean;
  isSalingProducts?: boolean;
  labels?: string[];
  onClick?: () => void;
}

const SearchItem = ({
    title, description, distance, businessName,
    isService = false, isSalingProducts = false,
    labels = [], onClick = () => {}
  }: Props) => {
  return (
    <div onClick={onClick} className="search-item my-2 bg-white p-4 rounded shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex items-center space-x-2 mb-2 flex-wrap">
        <span className="text-sm text-gray-500">{businessName}</span>
        <span className="text-sm text-gray-500">({distance.toFixed(1)} km)</span>
        {isService && <span className="bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">Servicios</span>}
        {isSalingProducts && <span className="bg-cyan-700 text-white text-xs font-medium px-2 py-1 rounded">Productos</span>}
        {labels.map((label, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            {label}
          </span>
        ))}
      </div>
      <p>{description}</p>
    </div>
  );
};

export default SearchItem;