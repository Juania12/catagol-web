import Image from "next/image";
import Link from "next/link";

import { equipos } from "../../data/equipos";
import { partidos } from "../../data/partidos";

export default function FeaturedMatch() {
  if (partidos.length === 0) return null;

  const partido = partidos[0];

  const local = equipos[partido.local as keyof typeof equipos];
  const visitante = equipos[partido.visitante as keyof typeof equipos];

  if (!local || !visitante) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-green-950 to-slate-900 border border-slate-700 shadow-2xl">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_70%)]" />

      <div className="relative z-10 p-10">

        <div className="text-center mb-8">

          <span className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full">
            🔥 PARTIDO DESTACADO
          </span>

        </div>

        <div className="grid grid-cols-3 items-center">

          <Link
            href={`/equipos/${local.slug}`}
            className="flex flex-col items-center hover:scale-105 transition"
          >
            <Image
              src={local.escudo}
              alt={local.nombre}
              width={130}
              height={130}
            />

            <h2 className="mt-5 text-2xl font-black text-center">
              {local.nombre}
            </h2>
          </Link>

          <div className="text-center">

            <div className="text-7xl font-black text-yellow-400">
              {partido.golesLocal}
              <span className="mx-4 text-white">-</span>
              {partido.golesVisitante}
            </div>

            <p className="mt-5 text-lg text-slate-300">
              {partido.fecha}
            </p>

            <p className="text-green-400">
              📍 {partido.estadio}
            </p>

            <Link
              href={`/partidos/${partido.id}`}
              className="inline-block mt-6 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-bold transition"
            >
              Ver partido
            </Link>

          </div>

          <Link
            href={`/equipos/${visitante.slug}`}
            className="flex flex-col items-center hover:scale-105 transition"
          >
            <Image
              src={visitante.escudo}
              alt={visitante.nombre}
              width={130}
              height={130}
            />

            <h2 className="mt-5 text-2xl font-black text-center">
              {visitante.nombre}
            </h2>
          </Link>

        </div>

      </div>

    </section>
  );
}