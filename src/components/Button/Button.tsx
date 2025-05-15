interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({children, className = '', disabled = false, onClick = () => {}}: ButtonProps) => {
  return (
    <button disabled={disabled} onClick={onClick} className={`mx-1 my-0.5 px-3 py-1 rounded-lg cursor-pointer ${className}`}>
      {children}
    </button>
  );
};

export default Button;