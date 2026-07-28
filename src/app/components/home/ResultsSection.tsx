import { partidos } from "../../data/partidos";
import MatchCard from "../matches/MatchCard";

export default function ResultsSection() {
  return (
    <section>
      <h2 className="text-3xl font-black mb-6">
        Últimos resultados
      </h2>

      {partidos.map((partido) => (
        <MatchCard
          key={partido.id}
          id={partido.id}
          local={partido.local}
          visitante={partido.visitante}
          golesLocal={partido.golesLocal}
          golesVisitante={partido.golesVisitante}
          fecha={partido.fecha}
          estadio={partido.estadio}
        />
      ))}
    </section>
  );
}