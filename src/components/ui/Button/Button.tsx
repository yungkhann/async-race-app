import './Button.scss';
interface ButtonProps {
  onClick?: () => void;
  color?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  color,
  children,
  disabled,
  className,
}) => {
  const buttonStyle = {
    backgroundColor: color || undefined,
  };

  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      style={buttonStyle}
      disabled={disabled}
    >
      {children || 'Button'}
    </button>
  );
};

export default Button;
