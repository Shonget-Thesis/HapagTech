

interface ButtonProps {
  text: string;
  className?: string;
  arrow?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, className = "", arrow = false }) => {
  const baseStyle = "px-4 py-2 rounded cursor-pointer inline-flex items-center justify-center";

  return (
    <button className={`${className} ${baseStyle} group overflow-hidden`}> 
      <span className="relative z-10 transition-all duration-300 group-active:translate-x-2">{text}</span>
      {arrow && (
        <span className="ml-3 inline-flex h-5 w-6 items-center justify-center overflow-hidden">
          <svg
            className="h-4 w-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1 group-active:translate-x-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
};

export default Button;
  