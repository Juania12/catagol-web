import Link from "next/link";
import Image from "next/image";
import { equipos } from "../data/equipos";

type MatchCardProps = {
  local: string;
  visitante: string;
  golesLocal: number;
  golesVisitante: number;
  fecha: string;
  estadio: string;
};

export default function MatchCard({
  local,
  visitante,
  golesLocal,
  golesVisitante,
  fecha,
  estadio,
}: MatchCardProps) {
  const equipoLocal = equipos[local as keyof typeof equipos];
  const equipoVisitante = equipos[visitante as keyof typeof equipos];

  return (
    <article className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6 shadow-lg hover:border-yellow-400 hover:shadow-xl transition-all duration-300">

      <div className="grid grid-cols-3 items-center">

        {/* Equipo Local */}
        <Link
          href={`/equipos/${equipoLocal.slug}`}
          className="flex flex-col items-center gap-2 hover:scale-105 transition"
        >
          <Image
            src={equipoLocal.escudo}
            alt={equipoLocal.nombre}
            width={60}
            height={60}
          />

          <span className="font-bold text-center">
            {equipoLocal.nombre}
          </span>
        </Link>

        {/* Resultado */}
        <div className="text-center">

          <p className="text-5xl font-black text-yellow-400">
            {golesLocal} - {golesVisitante}
          </p>

          <p className="text-sm text-slate-400 mt-2">
            Final
          </p>

        </div>

        {/* Equipo Visitante */}
        <Link
          href={`/equipos/${equipoVisitante.slug}`}
          className="flex flex-col items-center gap-2 hover:scale-105 transition"
        >
          <Image
            src={equipoVisitante.escudo}
            alt={equipoVisitante.nombre}
            width={60}
            height={60}
          />

          <span className="font-bold text-center">
            {equipoVisitante.nombre}
          </span>
        </Link>

      </div>

      <div className="mt-6 flex justify-between text-sm text-slate-300 border-t border-slate-700 pt-4">

        <span>📅 {fecha}</span>

        <span>🏟️ {estadio}</span>

      </div>

    </article>
  );
}