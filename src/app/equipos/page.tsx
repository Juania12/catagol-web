import Link from "next/link";
import Image from "next/image";

import { equipos } from "../data/equipos";

export default function EquiposPage() {
  const listaEquipos = Object.values(equipos).sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  return (
    <main className="min-h-screen bg-green-900 text-white">
      <div className="max-w-7xl mx-auto py-10 px-6">

        <Link
          href="/"
          className="inline-block mb-8 text-green-300 hover:text-white transition"
        >
          ← Volver al inicio
        </Link>

        <h1 className="text-5xl font-black mb-10">
          🛡️ Equipos
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {listaEquipos.map((equipo) => (

            <Link
              key={equipo.slug}
              href={`/equipos/${equipo.slug}`}
              className="bg-green-950 rounded-2xl p-6 hover:bg-green-800 transition shadow-xl flex flex-col items-center"
            >

              <Image
                src={equipo.escudo}
                alt={equipo.nombre}
                width={90}
                height={90}
                className="mb-4"
              />

              <h2 className="text-center font-bold text-lg">
                {equipo.nombre}
              </h2>

              <p className="text-sm text-green-300 mt-2">
                {equipo.liga}
              </p>

            </Link>

          ))}

        </div>

      </div>
    </main>
  );
}