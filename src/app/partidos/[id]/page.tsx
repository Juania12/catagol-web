import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { partidos } from "../../data/partidos";
import { obtenerEquipoPorNombre } from "../../lib/obtenerEquipos";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PartidoPage({ params }: Props) {
  const { id } = await params;

  const partido = partidos.find((p) => p.id === id);

  if (!partido) {
    notFound();
  }

  const local = obtenerEquipoPorNombre(partido.local);
  const visitante = obtenerEquipoPorNombre(partido.visitante);

  if (!local || !visitante) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-green-900 text-white">

      <div className="max-w-6xl mx-auto py-10 px-6">

        <Link
          href="/"
          className="text-green-300 hover:text-white"
        >
          ← Volver al inicio
        </Link>

        <div className="bg-green-950 rounded-3xl p-10 mt-6 shadow-2xl">

          <div className="grid grid-cols-3 items-center">

            {/* Local */}

            <div className="text-center">

              <Image
                src={local.escudo}
                alt={local.nombre}
                width={140}
                height={140}
                className="mx-auto"
              />

              <h2 className="text-3xl font-bold mt-5">
                {local.nombre}
              </h2>

            </div>

            {/* Resultado */}

            <div className="text-center">

              <p className="text-7xl font-black text-yellow-400">
                {partido.golesLocal} - {partido.golesVisitante}
              </p>

              <p className="text-gray-400 mt-3 text-xl">
                FINAL
              </p>

            </div>

            {/* Visitante */}

            <div className="text-center">

              <Image
                src={visitante.escudo}
                alt={visitante.nombre}
                width={140}
                height={140}
                className="mx-auto"
              />

              <h2 className="text-3xl font-bold mt-5">
                {visitante.nombre}
              </h2>

            </div>

          </div>

        </div>

        <div className="bg-green-950 rounded-3xl p-8 mt-8">

          <h2 className="text-3xl font-bold mb-6">
            Información del partido
          </h2>

          <div className="space-y-4 text-xl">

            <p>
              🏆 <strong>Liga:</strong> {partido.liga}
            </p>

            <p>
              📂 <strong>Categoría:</strong> {partido.categoria}
            </p>

            <p>
              📅 <strong>Fecha:</strong> {partido.fecha}
            </p>

            <p>
              🏟️ <strong>Estadio:</strong> {partido.estadio}
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}