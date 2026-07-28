import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { equipos } from "../../data/equipos";
import { obtenerEstadisticasEquipo } from "../../lib/calcularTabla";
import {
  obtenerPartidosEquipo,
  obtenerFormaEquipo,
} from "../../lib/obtenerPartidosEquipo";

type Props = {
  params: Promise<{
    nombre: string;
  }>;
};

export default async function EquipoPage({ params }: Props) {
  const { nombre } = await params;

  const equipo = Object.values(equipos).find(
    (e) => e.slug === nombre
  );

  if (!equipo) {
    notFound();
  }

  const estadisticas = obtenerEstadisticasEquipo(equipo.nombreCorto);
  const ultimosPartidos = obtenerPartidosEquipo(equipo.nombreCorto);
  const forma = obtenerFormaEquipo(equipo.nombreCorto);

  return (
    <main className="min-h-screen bg-green-900 text-white">
      <div className="max-w-5xl mx-auto py-10 px-6">

        <Link
          href="/equipos"
          className="inline-block mb-8 text-green-300 hover:text-white transition"
        >
          ← Volver a Equipos
        </Link>

        {/* Información del club */}

        <div className="bg-green-950 rounded-3xl shadow-2xl p-10">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <Image
              src={equipo.escudo}
              alt={equipo.nombre}
              width={170}
              height={170}
              priority
            />

            <div>

              <h1 className="text-5xl font-black">
                {equipo.nombre}
              </h1>

              <div className="mt-8 space-y-4 text-xl">

                <p>
                  🏆 <span className="font-semibold">Liga:</span> {equipo.liga}
                </p>

                <p>
                  📍 <span className="font-semibold">Ciudad:</span> {equipo.ciudad}
                </p>

                <p>
                  🗺️ <span className="font-semibold">Departamento:</span> {equipo.departamento}
                </p>

                <p>
                  📅 <span className="font-semibold">Fundación:</span> {equipo.fundacion}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Estadísticas */}

        <div className="bg-green-950 rounded-3xl shadow-2xl p-8 mt-8">

          <h2 className="text-3xl font-bold mb-6">
            📊 Estadísticas
          </h2>

          {estadisticas ? (

            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 text-center">

              <div>
                <p className="text-gray-400 text-sm">PJ</p>
                <p className="text-2xl font-bold">{estadisticas.pj}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">PG</p>
                <p className="text-2xl font-bold">{estadisticas.pg}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">PE</p>
                <p className="text-2xl font-bold">{estadisticas.pe}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">PP</p>
                <p className="text-2xl font-bold">{estadisticas.pp}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">GF</p>
                <p className="text-2xl font-bold">{estadisticas.gf}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">GC</p>
                <p className="text-2xl font-bold">{estadisticas.gc}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">DG</p>
                <p className="text-2xl font-bold">
                  {estadisticas.dg > 0 ? `+${estadisticas.dg}` : estadisticas.dg}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">PTS</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {estadisticas.pts}
                </p>
              </div>

            </div>

          ) : (

            <p className="text-gray-400">
              Todavía no hay estadísticas disponibles.
            </p>

          )}

        </div>

        {/* Forma */}

        <div className="bg-green-950 rounded-3xl shadow-2xl p-8 mt-8">

          <h2 className="text-3xl font-bold mb-6">
            📈 Forma
          </h2>

          <div className="flex gap-5 text-5xl">

            {forma.length > 0 ? (

              forma.map((resultado, index) => (

                <span key={index}>

                  {resultado === "G" && "🟢"}

                  {resultado === "E" && "🟡"}

                  {resultado === "P" && "🔴"}

                </span>

              ))

            ) : (

              <p className="text-lg text-gray-400">
                Todavía no hay partidos registrados.
              </p>

            )}

          </div>

        </div>

        {/* Últimos partidos */}

        <div className="bg-green-950 rounded-3xl shadow-2xl p-8 mt-8">

          <h2 className="text-3xl font-bold mb-6">
            ⚽ Últimos partidos
          </h2>

          {ultimosPartidos.length > 0 ? (

            <div className="space-y-4">

              {ultimosPartidos.map((partido, index) => (

                <div
                  key={index}
                  className="bg-green-800 rounded-xl p-5"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-xl font-bold">
                        {partido.local}

                        <span className="mx-3 text-yellow-400">
                          {partido.golesLocal} - {partido.golesVisitante}
                        </span>

                        {partido.visitante}
                      </p>

                      <p className="text-gray-300 mt-1">
                        {partido.fecha}
                      </p>

                    </div>

                    <div className="text-gray-400 text-sm">
                      {partido.estadio}
                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-400">
              No hay partidos registrados.
            </p>

          )}

        </div>

      </div>
    </main>
  );
}