import Mark from "../../assets/Team/Mark.png"
import Roxanne from "../../assets/Team/Roxanne.png"
import Rhenel from "../../assets/Team/Rhenel.png"

interface MemberCardProps {
  image: string; 
  name: string;
  title: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ image, name, title }) => {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-xs rounded-2xl bg-white p-6 shadow-sm border border-[#32347C]/10">
      <div className="w-44 h-44 mb-4 rounded-full bg-white/40 p-2">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-[#32347C] text-xl font-semibold mb-1">{name}</h3>
      <p className="text-[#525252] text-base">{title}</p>
    </div>
  );
}

const Team = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#FF5300]">Our people</p>
          <h2 className="mt-3 text-4xl font-extrabold text-[#32347C]">Meet the Team</h2>
          <p className="mt-4 text-base text-[#525252]">A small crew with a shared taste for bold ideas and polished execution.</p>
        </div>

        <div className="flex flex-col items-center gap-6 p-4 md:p-6 md:flex-row md:items-stretch md:justify-center md:gap-8">
          <MemberCard 
            image={Mark} 
            name="Mark Vincent Limpahan" 
            title="UI/UX Designer" 
          />
          <MemberCard 
            image={Roxanne} 
            name="Roxanne Locsin" 
            title="Front-end Developer" 
          />
          <MemberCard 
            image={Rhenel} 
            name="Rhenel Jhon Sajol" 
            title="Back-end Developer" 
          />
        </div>
      </div>
    </section>
  )
}

export default Team