interface Props {
  username: string;
  rating: number;
  date: Date;
  comment: string;
}

const Opinion = ({username, rating, date, comment}: Props) => {
  const dateInElSalvador = new Date(date.getTime() - 6 * 60 * 60 * 1000);
  const daysAgo = Math.floor((new Date().getTime() - dateInElSalvador.getTime()) / (1000 * 60 * 60 * 24));
  const minutesAgo = Math.floor((new Date().getTime() - dateInElSalvador.getTime()) / (1000 * 60));
  const secondsAgo = Math.floor((new Date().getTime() - dateInElSalvador.getTime()) / 1000);
  let timeAgo = '';

  if (daysAgo > 0) {
    timeAgo = `Hace ${daysAgo} día${daysAgo > 1 ? 's' : ''}`;
  } else if (minutesAgo > 0) {
    timeAgo = `Hace ${minutesAgo} minuto${minutesAgo > 1 ? 's' : ''}`;
  } else {
    timeAgo = `Hace ${secondsAgo} segundo${secondsAgo > 1 ? 's' : ''}`;
  }

  return (
    <div>
      <span className="text-xl text-bold">{username}</span>
      <p className="text-yellow-500 mr-1">{
        '★'.repeat(rating) + '☆'.repeat(5 - rating)
      } <span className="text-gray-500">({timeAgo})</span></p>
      <p className="text-sm">"{comment}"</p>
    </div>
  );
}

export default Opinion;