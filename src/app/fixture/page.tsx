import Link from "next/link";

import { partidos } from "../data/partidos";

export default function FixturePage() {
  const partidosPorFecha = partidos.reduce((acc, partido) => {
    if (!acc[partido.fecha]) {
      acc[partido.fecha] = [];
    }

    acc[partido.fecha].push(partido);

    return acc;
  }, {} as Record<string, typeof partidos>);

  return (
    <main className="min-h-screen bg-green-900 text-white">

      <div className="max-w-6xl mx-auto py-10 px-6">

        <Link
          href="/"
          className="text-green-300 hover:text-white"
        >
          ← Volver al inicio
        </Link>

        <h1 className="text-5xl font-black mt-6 mb-10">
          📅 Fixture
        </h1>

        {Object.entries(partidosPorFecha).map(([fecha, lista]) => (

          <div
            key={fecha}
            className="bg-green-950 rounded-3xl p-8 mb-8"
          >

            <h2 className="text-3xl font-bold mb-6">
              {fecha}
            </h2>

            <div className="space-y-4">

              {lista.map((partido) => (

                <div
                  key={partido.id}
                  className="flex justify-between items-center bg-green-800 rounded-xl p-4"
                >

                  <span className="font-semibold">
                    {partido.local}
                  </span>

                  <span className="text-yellow-400 font-bold text-xl">
                    {partido.golesLocal} - {partido.golesVisitante}
                  </span>

                  <span className="font-semibold">
                    {partido.visitante}
                  </span>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}