import logoOrange from '../../assets/LogoOrange.svg'

interface LogoOrangeProps {
  className?: string;
}

const LogoOrange: React.FC<LogoOrangeProps> = ({ className }) => {
  return (
    <img src={logoOrange} className={className}/>
  )
}

export default LogoOrange
