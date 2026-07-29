import Image from "next/image";
import Link from "next/link";

import { heroPrincipal } from "../../../data/hero";
import { partidos } from "../../../data/partidos";
import { obtenerEquipoPorNombre } from "../../../lib/obtenerEquipos";

export default function HomeHero() {
 if (heroPrincipal.tipo === "partido") {
  const partidoId = heroPrincipal.partidoId;

  const partido = partidos.find(
    (item) => item.id === partidoId
  );

    if (!partido) return null;

    const local = obtenerEquipoPorNombre(partido.local);
    const visitante = obtenerEquipoPorNombre(partido.visitante);

    if (!local || !visitante) return null;

    return (
      <section className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3F6B3C]/40 via-slate-950/95 to-[#A65E2E]/35" />

        <div className="relative z-10 p-6 md:p-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                Partido destacado
              </p>

              <p className="mt-2 text-sm text-slate-300">
                {partido.liga} · {partido.categoria}
              </p>
            </div>

            <span className="rounded-full border border-slate-600 bg-slate-950/70 px-4 py-2 text-sm font-bold text-[#F5F1E8]">
              Final
            </span>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
            <Link
              href={`/equipos/${local.slug}`}
              className="flex flex-col items-center transition hover:-translate-y-1"
            >
              <Image
                src={local.escudo}
                alt={local.nombre}
                width={130}
                height={130}
                className="h-28 w-28 object-contain md:h-32 md:w-32"
              />

              <h2 className="mt-4 text-center text-xl font-black text-[#F5F1E8] md:text-2xl">
                {local.nombreCorto}
              </h2>
            </Link>

            <div className="text-center">
              <p className="text-6xl font-black text-[#D6B46A] md:text-7xl">
                {partido.golesLocal}
                <span className="mx-4 text-[#F5F1E8]">-</span>
                {partido.golesVisitante}
              </p>

              <p className="mt-5 text-base font-semibold text-[#F5F1E8]">
                {partido.fecha}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {partido.estadio}
              </p>

              <Link
                href={`/partidos/${partido.id}`}
                className="mt-6 inline-flex rounded-xl bg-[#D6B46A] px-6 py-3 font-black text-slate-950 transition hover:bg-[#e3c57f]"
              >
                Ver partido
              </Link>
            </div>

            <Link
              href={`/equipos/${visitante.slug}`}
              className="flex flex-col items-center transition hover:-translate-y-1"
            >
              <Image
                src={visitante.escudo}
                alt={visitante.nombre}
                width={130}
                height={130}
                className="h-28 w-28 object-contain md:h-32 md:w-32"
              />

              <h2 className="mt-4 text-center text-xl font-black text-[#F5F1E8] md:text-2xl">
                {visitante.nombreCorto}
              </h2>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return null;
}