import Link from "next/link";
import Image from "next/image";

import { obtenerEquipoPorNombre } from "../../lib/obtenerEquipos";
import { partidos } from "../../data/partidos";

type MatchCardProps = {
  id: string;
  local: string;
  visitante: string;
  golesLocal: number;
  golesVisitante: number;
  fecha: string;
  estadio: string;
};

export default function MatchCard({
  id,
  local,
  visitante,
  golesLocal,
  golesVisitante,
  fecha,
  estadio,
}: MatchCardProps) {
  const equipoLocal = obtenerEquipoPorNombre(local);
  const equipoVisitante = obtenerEquipoPorNombre(visitante);

  if (!equipoLocal || !equipoVisitante) return null;

  const partido = partidos.find((p) => p.id === id);

  return (
    <Link href={`/partidos/${id}`}>

      <article className="bg-slate-800 rounded-3xl border border-slate-700 hover:border-green-500 hover:shadow-2xl transition-all duration-300 p-7 mb-6 cursor-pointer">

        <div className="text-center mb-6">

          <p className="text-green-400 font-semibold">
            {partido?.liga}
          </p>

          <p className="text-sm text-slate-400">
            {partido?.categoria}
          </p>

        </div>

        <div className="grid grid-cols-3 items-center">

          <div className="flex flex-col items-center">

            <Image
              src={equipoLocal.escudo}
              alt={equipoLocal.nombre}
              width={80}
              height={80}
            />

            <p className="mt-3 text-center font-bold">
              {equipoLocal.nombre}
            </p>

          </div>

          <div className="text-center">

            <p className="text-6xl font-black text-yellow-400">
              {golesLocal}
              <span className="mx-3 text-white">-</span>
              {golesVisitante}
            </p>

            <span className="inline-block mt-3 bg-green-600 px-4 py-1 rounded-full text-sm font-semibold">
              FINAL
            </span>

          </div>

          <div className="flex flex-col items-center">

            <Image
              src={equipoVisitante.escudo}
              alt={equipoVisitante.nombre}
              width={80}
              height={80}
            />

            <p className="mt-3 text-center font-bold">
              {equipoVisitante.nombre}
            </p>

          </div>

        </div>

        <div className="mt-8 border-t border-slate-700 pt-4 flex justify-between text-slate-400 text-sm">

          <span>📅 {fecha}</span>

          <span>📍 {estadio}</span>

        </div>

      </article>

    </Link>
  );
}