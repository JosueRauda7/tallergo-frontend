import Footer from "../../Footer/Footer";

interface Props {
  children?: React.ReactNode;
}

const MainContainer = ({children}: Props) => {
  return (
    <div className="container mx-auto px-4 py-6 bg-white min-h-full">
      {children}
    </div>
  );
}

export default MainContainer;