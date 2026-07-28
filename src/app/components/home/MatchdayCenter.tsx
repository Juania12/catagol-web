import Image from "next/image";
import Link from "next/link";

import { partidos } from "../../data/partidos";
import { obtenerEquipoPorNombre } from "../../lib/obtenerEquipos";
import Badge from "../ui/Badge";

export default function MatchdayCenter() {
  return (
    <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

      {/* Encabezado */}

      <div className="flex flex-col gap-4 border-b border-[#4f673c] px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7">

        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#D6B46A]">
            Centro de la fecha
          </p>

          <h2 className="mt-2 text-2xl font-black text-[#F5F1E8]">
            Últimos resultados
          </h2>
        </div>

        <Link
          href="/fixture"
          className="text-sm font-bold text-[#D6B46A] transition hover:text-[#ead292]"
        >
          Ver fixture completo →
        </Link>

      </div>

      {/* Partidos */}

      <div className="divide-y divide-[#33462b]">

        {partidos.map((partido) => {
          const local = obtenerEquipoPorNombre(partido.local);
          const visitante = obtenerEquipoPorNombre(partido.visitante);

          if (!local || !visitante) {
            return null;
          }

          return (
            <Link
              key={partido.id}
              href={`/partidos/${partido.id}`}
              className="group block px-4 py-5 transition hover:bg-[#1b3020] md:px-7"
            >

              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

                <div className="flex items-center gap-2">

                  <Badge
                    variant={
                      partido.liga === "Chacarera"
                        ? "chacarera"
                        : partido.liga === "Regional Amateur"
                        ? "regional"
                        : "catamarquena"
                    }
                  >
                    {partido.liga}
                  </Badge>

                  <span className="text-xs font-semibold text-[#aab6a5]">
                    {partido.categoria}
                  </span>

                </div>

                <Badge variant="final">
                  Final
                </Badge>

              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">

                {/* Local */}

                <div className="flex min-w-0 items-center gap-3">

                  <Image
                    src={local.escudo}
                    alt={local.nombre}
                    width={52}
                    height={52}
                    className="h-11 w-11 shrink-0 object-contain md:h-13 md:w-13"
                  />

                  <div className="min-w-0">

                    <p className="truncate font-black text-[#F5F1E8]">
                      {local.nombreCorto}
                    </p>

                    <p className="mt-1 hidden truncate text-xs text-[#879783] sm:block">
                      Local
                    </p>

                  </div>

                </div>

                {/* Resultado */}

                <div className="rounded-xl border border-[#526b40] bg-[#0e1b12] px-4 py-3 text-center shadow-lg">

                  <p className="whitespace-nowrap text-2xl font-black text-[#D6B46A] md:text-3xl">
                    {partido.golesLocal}
                    <span className="mx-2 text-[#71806d]">—</span>
                    {partido.golesVisitante}
                  </p>

                </div>

                {/* Visitante */}

                <div className="flex min-w-0 items-center justify-end gap-3">

                  <div className="min-w-0 text-right">

                    <p className="truncate font-black text-[#F5F1E8]">
                      {visitante.nombreCorto}
                    </p>

                    <p className="mt-1 hidden truncate text-xs text-[#879783] sm:block">
                      Visitante
                    </p>

                  </div>

                  <Image
                    src={visitante.escudo}
                    alt={visitante.nombre}
                    width={52}
                    height={52}
                    className="h-11 w-11 shrink-0 object-contain md:h-13 md:w-13"
                  />

                </div>

              </div>

              {/* Información inferior */}

              <div className="mt-4 flex flex-col gap-2 border-t border-[#33462b] pt-3 text-xs text-[#aab6a5] sm:flex-row sm:items-center sm:justify-between">

                <span>{partido.fecha}</span>

                <span>{partido.estadio}</span>

                <span className="font-bold text-[#D6B46A] opacity-0 transition group-hover:opacity-100">
                  Ver Match Center →
                </span>

              </div>

            </Link>
          );
        })}

      </div>

    </section>
  );
}