import { useEffect, useRef } from "react"

const Mark = new URL('../../assets/Team/Mark.png', import.meta.url).href;
const Roxanne = new URL('../../assets/Team/Roxanne.png', import.meta.url).href;
const Rhenel = new URL('../../assets/Team/Rhenel.png', import.meta.url).href;
const Heart = new URL('../../assets/Team/Heart.png', import.meta.url).href;

interface MemberCardProps {
  image: string;
  name: string;
  title: string;
  description: string;
}

function useGlowCanvas(cardRef: React.RefObject<HTMLDivElement | null>, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;

    const ctx = canvas.getContext('2d')!;
    let animId: number | null = null;

    function resize() {
      canvas!.width = card!.offsetWidth;
      canvas!.height = card!.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(card);

    function pointOnRRect(pos: number, w: number, h: number, r: number) {
      const arc = 0.5 * Math.PI * r;
      const segs = [w - 2*r, arc, h - 2*r, arc, w - 2*r, arc, h - 2*r, arc];
      const total = segs.reduce((a, b) => a + b, 0);
      let d = ((pos % total) + total) % total;
      let x = 0, y = 0;

      if (d < segs[0]) {
        x = r + d; y = 0;
      } else if ((d -= segs[0]) < segs[1]) {
        const a = -Math.PI/2 + (d/arc)*(Math.PI/2);
        x = w-r + Math.cos(a)*r; y = r + Math.sin(a)*r;
      } else if ((d -= segs[1]) < segs[2]) {
        x = w; y = r + d;
      } else if ((d -= segs[2]) < segs[3]) {
        const a = (d/arc)*(Math.PI/2);
        x = w-r + Math.cos(a)*r; y = h-r + Math.sin(a)*r;
      } else if ((d -= segs[3]) < segs[4]) {
        x = w-r-d; y = h;
      } else if ((d -= segs[4]) < segs[5]) {
        const a = Math.PI/2 + (d/arc)*(Math.PI/2);
        x = r + Math.cos(a)*r; y = h-r + Math.sin(a)*r;
      } else if ((d -= segs[5]) < segs[6]) {
        x = 0; y = h-r-d;
      } else {
        d -= segs[6];
        const a = Math.PI + (d/arc)*(Math.PI/2);
        x = r + Math.cos(a)*r; y = r + Math.sin(a)*r;
      }
      return { x, y };
    }

    function draw(ts: number) {
      const w = canvas!.width;
      const h = canvas!.height;
      const r = 14;
      ctx.clearRect(0, 0, w, h);

      const perimeter = 2*(w+h) - 8*r + 2*Math.PI*r;
      const pos1 = ((ts / 6000) % 1) * perimeter;
      const pos2 = ((ts / 6000 + 0.5) % 1) * perimeter;
      const trailLength = 500;
      const segments = 60;

      [pos1, pos2].forEach(pos => {
        for (let i = 0; i < segments; i++) {
          const t = pos - (i / segments) * trailLength;
          const tp = pointOnRRect(t, w, h, r);
          const alpha = (1 - i / segments) * 0.25;
          const radius = 10 - i * 0.2;
          const glow = ctx.createRadialGradient(tp.x, tp.y, 0, tp.x, tp.y, Math.max(radius, 2));
          glow.addColorStop(0, `rgba(255, 174, 0, ${alpha})`);
          glow.addColorStop(1, 'rgba(255, 174, 0, 0)');
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, Math.max(radius, 2), 0, Math.PI*2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    }

    function onEnter() {
      if (!animId) animId = requestAnimationFrame(draw);
    }
    function onLeave() {
      if (animId) { cancelAnimationFrame(animId); animId = null; }
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
    }

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      ro.disconnect();
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [cardRef, canvasRef]);
}

const MemberCard: React.FC<MemberCardProps> = ({ image, name, title, description }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGlowCanvas(cardRef, canvasRef);

  return (
    <div ref={cardRef} className="member-card">
      <canvas ref={canvasRef} className="glow-canvas" aria-hidden="true" />
      <div className="card-inner">

        {/* Layer 1  */}
        <div className="default-layer">
          <div className="card-image">
            <img src={image} alt={name} className="w-full h-full object-contain" />
          </div>
          <h3 className="card-name">{name}</h3>
          <p className="card-role">{title}</p>
        </div>

        {/* Layer 2 */}
        <div className="hover-layer">
          <h3 className="hover-name">{name}</h3>
          <p className="hover-role">{title}</p>
          <p className="hover-description">{description}</p>
        </div>

      </div>
    </div>
  );
};

const Team = () => {
  return (
    <section className="bg-white pt-4 md:pt-2 pb-16 md:pb-20">
      <style>{`
        /* ── Wrapper ── */
        .member-card {
          position: relative;
          width: 100%;
          max-width: 20rem;
          border-radius: 1rem;
          padding: 2px;
          background: transparent;
          isolation: isolate;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .member-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 0 18px rgba(255, 100, 0, 0.22),
            0 8px 24px rgba(255, 83, 0, 0.16),
            0 20px 48px rgba(200, 60, 0, 0.10),
            0 2px 8px rgba(0, 0, 0, 0.06);
        }

        /* ── Canvas ── */
        .glow-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .member-card:hover .glow-canvas {
          opacity: 1;
        }

        /* ── Card shell ── */
        .card-inner {
          position: relative;
          z-index: 2;
          border-radius: calc(1rem - 2px);
          border: 3px solid rgba(0, 0, 0, 0.08);
          background: white;
          overflow: hidden;
          height: 320px; /* fixed height so layers can overlap cleanly */
        }

        /* ── Default layer ── */
        .default-layer {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
          transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 1;
          transform: translateY(0px);
        }
        .member-card:hover .default-layer {
          opacity: 0;
          transform: translateY(-18px);
        }

        /* ── Card image ── */
        .card-image {
          width: 9rem;
          height: 9rem;
          border-radius: 9999px;
          padding: 0.5rem;
          margin-bottom: 1rem;
          flex-shrink: 0;
        }

        /* ── Default text ── */
        .card-name {
          color: #FFAE00;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }
        .card-role {
          color: #525252;
          font-size: 0.9rem;
        }

        /* ── Hover layer ── */
        .hover-layer {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 1.75rem 1.5rem 1.5rem;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .member-card:hover .hover-layer {
          opacity: 1;
          transform: translateY(0px);
          pointer-events: auto;
        }

        .hover-name {
          color: #FFAE00;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
          line-height: 1.3;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hover-role {
          color: #FF5300;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 1rem;
          letter-spacing: 0.01em;
        }
        .hover-description {
          color: #525252;
          font-size: 1rem;
          line-height: 1.6;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.1s,
          transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
          overflow-y: auto;
          max-height: 210px;
          scrollbar-width: none;
        }
        .hover-description::-webkit-scrollbar { display: none; }
        .member-card:hover .hover-description {
          opacity: 1;
          transform: translateY(0px);
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mt-2 text-5xl font-extrabold text-[#FF5300]">Meet the Team</h2>
          <p className="mt-4 text-lg text-[#525252]">
            The chefs behind the screens, crafting a smarter way to dine.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 p-4 md:p-6 md:flex-row md:items-stretch md:justify-center md:gap-8 flex-wrap">
          <MemberCard
            image={Roxanne}
            name="Roxanne Locsin"
            title="Project Manager / Scrum Master"
            description="The team's human reminder app, calendar, and emotional support system rolled into one. Roxanne keeps HapagTech alive through deadlines, meetings, and the occasional 'guys, pa-update sa task.' Known for turning chaos into organized chaos with just enough caffeine and determination."
          />
          <MemberCard
            image={Mark}
            name="Mark Vincent Limpahan"
            title="Quality Assurance Lead"
            description="Professional bug hunter and certified 'wait, naa'y mali' specialist. Mark's mission in life is making sure every button works, every feature behaves, and every unexpected error gets exposed before the users do. If something breaks, chances are he already saw it coming."
          />
          <MemberCard
            image={Rhenel}
            name="Rhenel Jhon Sajol"
            title="DevOps Lead"
            description="Keeper of deployments, cloud mysteries, and the sacred environment variables. Rhenel ensures the system survives pushes, merges, and random production panic moments. Fluent in 'it works on my machine' translations and powered mainly by troubleshooting and persistence."
          />
          <MemberCard
            image={Heart}
            name="Heart Chiong"
            title="Documentation Lead"
            description="The storyteller of the team who transforms confusing ideas into readable and organized documents. Heart makes sure every feature, workflow, and requirement actually makes sense on paper. Without him, the project would probably just be 'trust me bro' in document form."
          />
        </div>
      </div>
    </section>
  );
}

export default Team;