import logoYellow from '../../assets/LogoYellow.svg'

interface LogoBlueProps {
  className?: string;
}

const LogoBlue: React.FC<LogoBlueProps> = ({ className }) => {
  return (
    <img src={logoYellow} className={className} alt="HapagTech logo" />
  )
}

export default LogoBlue