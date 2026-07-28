import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { competiciones } from "../../data/competiciones";
import { calcularTabla } from "../../lib/calcularTabla";
import { partidos } from "../../data/partidos";
import { proximos } from "../../data/proximos";
import { equipos } from "../../data/equipos";

type Props = {
  params: Promise<{
    liga: string;
  }>;
};

export default async function LigaPage({ params }: Props) {
  const { liga } = await params;

  const competencia =
    competiciones[liga as keyof typeof competiciones];

  if (!competencia) {
    notFound();
  }

  const tabla = calcularTabla(
    competencia.nombre.replace("Liga ", "")
  );

  const partidosLiga = partidos.filter(
    (p) => p.liga === competencia.nombre.replace("Liga ", "")
  );

  const proximosLiga = proximos.filter(
    (p) => p.liga === competencia.nombre.replace("Liga ", "")
  );

  const equiposLiga = Object.values(equipos).filter(
    (e) =>
      e.liga === competencia.nombre.replace("Liga ", "")
  );

  return (
    <main className="min-h-screen bg-green-900 text-white">

      <div className="max-w-7xl mx-auto py-10 px-6">

        <Link
          href="/"
          className="text-green-300 hover:text-white"
        >
          ← Volver al inicio
        </Link>

        {/* CABECERA */}

        <div className="bg-green-950 rounded-3xl p-10 mt-6 mb-8">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <Image
              src={competencia.logo}
              alt={competencia.nombre}
              width={120}
              height={120}
            />

            <div>

              <h1 className="text-5xl font-black">
                {competencia.nombre}
              </h1>

              <p className="text-green-300 text-xl mt-3">
                Liga Oficial de Catamarca
              </p>

              <div className="flex flex-wrap gap-4 mt-6">

                {competencia.categorias.map((categoria) => (

                  <div
                    key={categoria.nombre}
                    className="bg-green-800 rounded-xl px-5 py-3"
                  >

                    <p className="font-bold">
                      {categoria.nombre}
                    </p>

                    <p className="text-green-300">
                      ⚽ {categoria.equipos} equipos
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

        {/* TABLA */}

        <div className="bg-green-950 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            📊 Tabla de posiciones
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b border-green-700">

                <th className="text-left py-2">#</th>
                <th className="text-left py-2">Equipo</th>
                <th className="text-center py-2">PTS</th>
                <th className="text-center py-2">PJ</th>
                <th className="text-center py-2">DG</th>

              </tr>

            </thead>

            <tbody>

              {tabla.map((equipo) => (

                <tr
                  key={equipo.equipo}
                  className="border-b border-green-800"
                >

                  <td className="py-3">
                    {equipo.posicion}
                  </td>

                  <td>
                    {equipo.equipo}
                  </td>

                  <td className="text-center">
                    {equipo.pts}
                  </td>

                  <td className="text-center">
                    {equipo.pj}
                  </td>

                  <td className="text-center">
                    {equipo.dg}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* RESULTADOS */}

        <div className="bg-green-950 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            ⚽ Últimos resultados
          </h2>

          {partidosLiga.map((partido) => (

            <div
              key={partido.id}
              className="flex justify-between py-3 border-b border-green-800"
            >

              <span>{partido.local}</span>

              <span className="font-bold text-yellow-400">
                {partido.golesLocal} - {partido.golesVisitante}
              </span>

              <span>{partido.visitante}</span>

            </div>

          ))}

        </div>

        {/* PRÓXIMOS */}

        <div className="bg-green-950 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            📅 Próximos partidos
          </h2>

          {proximosLiga.map((partido) => (

            <div
              key={partido.local + partido.visitante}
              className="flex justify-between py-3 border-b border-green-800"
            >

              <span>{partido.local}</span>

              <span>
                {partido.fecha} - {partido.hora}
              </span>

              <span>{partido.visitante}</span>

            </div>

          ))}

        </div>

        {/* EQUIPOS */}

        <div className="bg-green-950 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            🛡️ Equipos participantes
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {equiposLiga.map((equipo) => (

              <Link
                key={equipo.slug}
                href={`/equipos/${equipo.slug}`}
                className="bg-green-800 rounded-xl p-4 text-center hover:bg-green-700 transition"
              >

                {equipo.nombre}

              </Link>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}