interface Props {
  children?: React.ReactNode;
}

const MainContainer = ({children}: Props) => {
  return (
    <div className="container mx-auto px-4 py-6 bg-white">
      {children}
    </div>
  );
}

export default MainContainer;