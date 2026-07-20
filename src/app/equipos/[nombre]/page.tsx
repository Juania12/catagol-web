import Image from "next/image";
import { notFound } from "next/navigation";

import { equipos } from "../../data/equipos";
import { partidos } from "../../data/partidos";
import { estadisticas } from "../../data/estadisticas";
import MatchCard from "../../components/MatchCard";

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

  const stats =
    estadisticas[equipo.nombre as keyof typeof estadisticas];

  const partidosDelEquipo = partidos.filter(
    (partido) =>
      partido.local === equipo.nombre ||
      partido.visitante === equipo.nombre
  );

  return (
    <main className="min-h-screen bg-green-800 text-white py-10">
      <div className="max-w-6xl mx-auto">

        {/* Cabecera */}
        <div className="bg-green-950 rounded-3xl p-8 shadow-xl">

          <div className="flex items-center gap-8">

            <Image
              src={equipo.escudo}
              alt={equipo.nombre}
              width={140}
              height={140}
            />

            <div>

              <h1 className="text-5xl font-bold">
                {equipo.nombre}
              </h1>

              <div className="mt-5 space-y-2 text-lg">

                <p>
                  🏟️ <strong>Estadio:</strong> {equipo.estadio}
                </p>

                <p>
                  📍 <strong>Ciudad:</strong> {equipo.ciudad}
                </p>

                <p>
                  🎨 <strong>Colores:</strong> {equipo.colores}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Estadísticas */}
        <section className="bg-white text-black rounded-3xl shadow-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            📊 Estadísticas
          </h2>

          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">

            <div className="bg-green-100 rounded-xl p-4 text-center">
              <p className="text-sm">PJ</p>
              <p className="text-2xl font-bold">{stats.pj}</p>
            </div>

            <div className="bg-green-100 rounded-xl p-4 text-center">
              <p className="text-sm">PG</p>
              <p className="text-2xl font-bold">{stats.pg}</p>
            </div>

            <div className="bg-green-100 rounded-xl p-4 text-center">
              <p className="text-sm">PE</p>
              <p className="text-2xl font-bold">{stats.pe}</p>
            </div>

            <div className="bg-green-100 rounded-xl p-4 text-center">
              <p className="text-sm">PP</p>
              <p className="text-2xl font-bold">{stats.pp}</p>
            </div>

            <div className="bg-green-100 rounded-xl p-4 text-center">
              <p className="text-sm">GF</p>
              <p className="text-2xl font-bold">{stats.gf}</p>
            </div>

            <div className="bg-green-100 rounded-xl p-4 text-center">
              <p className="text-sm">GC</p>
              <p className="text-2xl font-bold">{stats.gc}</p>
            </div>

            <div className="bg-yellow-300 rounded-xl p-4 text-center">
              <p className="text-sm">PTS</p>
              <p className="text-3xl font-bold">{stats.pts}</p>
            </div>

          </div>

        </section>

        {/* Últimos partidos */}
        <section className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            ⚽ Últimos partidos
          </h2>

          {partidosDelEquipo.length > 0 ? (
            partidosDelEquipo.map((partido) => (
              <MatchCard
                key={partido.local + partido.visitante}
                local={partido.local}
                visitante={partido.visitante}
                golesLocal={partido.golesLocal}
                golesVisitante={partido.golesVisitante}
                fecha={partido.fecha}
                estadio={partido.estadio}
              />
            ))
          ) : (
            <div className="bg-green-950 rounded-xl p-6 text-center">
              No hay partidos registrados para este equipo.
            </div>
          )}

        </section>

      </div>
    </main>
  );
}