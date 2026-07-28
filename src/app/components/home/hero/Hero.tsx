import { partidos } from "../../../data/partidos";
import { obtenerEquipoPorNombre } from "../../../lib/obtenerEquipos";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

export default function Hero() {
  const partido = partidos[0];

  if (!partido) {
    return null;
  }

  const local = obtenerEquipoPorNombre(partido.local);
  const visitante = obtenerEquipoPorNombre(partido.visitante);

  if (!local || !visitante) {
    return null;
  }

  return (
    <section className="relative h-[360px] overflow-hidden rounded-3xl border border-slate-800 shadow-2xl md:h-[440px] lg:h-[480px]">
      <HeroBackground imagen={undefined} />

      <HeroContent
        liga={partido.liga}
        estado="FINAL"
        local={local.nombreCorto}
        visitante={visitante.nombreCorto}
        escudoLocal={local.escudo}
        escudoVisitante={visitante.escudo}
        resultado={`${partido.golesLocal} — ${partido.golesVisitante}`}
        estadio={partido.estadio}
        partidoId={partido.id}
      />
    </section>
  );
}