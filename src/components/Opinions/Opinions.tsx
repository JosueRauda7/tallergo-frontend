import { useEffect, useState } from "react";
import Opinion from "./Opinion";

interface Props {
  idGarage: number;
}

const Opinions = ({idGarage}: Props) => {
  const [opinions, setOpinions] = useState([{
    username: "Usuario1",
    rating: 5,
    date: new Date("2023-10-01T12:00:00Z"),
    comment: "Excelente servicio, muy profesionales."
  }, {
    username: "Usuario2",
    rating: 4,
    date: new Date("2023-09-25T15:30:00Z"),
    comment: "Muy buen taller, aunque el tiempo de espera fue un poco largo."
  }, {
    username: "Usuario3",
    rating: 5,
    date: new Date("2023-09-20T10:15:00Z"),
    comment: "Recomiendo este taller, hicieron un gran trabajo en mi coche."
  },
  {
    username: "Usuario4",
    rating: 3,
    date: new Date("2023-09-15T08:45:00Z"),
    comment: "El servicio fue bueno, pero podrían mejorar la atención al cliente."
  }, {
    username: "Usuario5",
    rating: 4,
    date: new Date("2023-09-10T14:20:00Z"),
    comment: "Buen taller, aunque el precio fue un poco alto."
  }
  ]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const totalRating = opinions.reduce((acc, opinion) => acc + opinion.rating, 0);
    const average = totalRating / opinions.length || 0;
    setAverageRating(average);
  }, [opinions, setOpinions, averageRating]);

  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-2xl font-bold">Reseñas y comentarios</h3>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500 mr-1">{ '★'.repeat(Math.round(averageRating)) + '☆'.repeat(5 - Math.round(averageRating)) }</span>
        <span className="text-gray-500">4.8 ({opinions.length} reseñas)</span>
      </div>
      <div className="h-60 overflow-y-auto">
        {
          opinions.length > 0
          ? opinions.map((opinion, index) => (
            <Opinion
              key={index}
              username={opinion.username}
              rating={opinion.rating}
              date={opinion.date}
              comment={opinion.comment}
            />
          ))
          : null
        }
      </div>
    </div>
  );
};

export default Opinions;