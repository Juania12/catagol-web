import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Badge from "../../components/ui/Badge";

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

  const nombreLiga = competencia.nombre.replace("Liga ", "");

  const tabla = calcularTabla(nombreLiga);

  const partidosLiga = partidos.filter(
    (p) => p.liga === nombreLiga
  );

  const proximosLiga = proximos.filter(
    (p) => p.liga === nombreLiga
  );

  const equiposLiga = Object.values(equipos).filter(
    (e) => e.liga === nombreLiga
  );

  const badgeVariant =
    competencia.slug === "chacarera"
      ? "chacarera"
      : "catamarquena";

  return (
    <main className="min-h-screen bg-[#0d1b12] text-[#F5F1E8]">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <Link
          href="/ligas"
          className="inline-flex text-sm font-bold text-[#D6B46A] hover:text-[#ead292]"
        >
          ← Volver a las ligas
        </Link>

        {/* CABECERA */}

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3F6B3C]/45 via-[#142318] to-[#A65E2E]/25" />

          <div className="relative z-10 flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:px-10 md:py-12">
            <Image
              src={competencia.logo}
              alt={competencia.nombre}
              width={110}
              height={110}
            />

            <div>
              <Badge variant={badgeVariant}>
                Liga oficial
              </Badge>

              <h1 className="mt-4 text-4xl font-black md:text-6xl">
                {competencia.nombre}
              </h1>

              <p className="mt-3 text-lg text-[#aab6a5]">
                Fecha actual: {competencia.fechaActual}
              </p>
            </div>
          </div>
        </section>

        {/* TABLA */}

        <section className="mt-8 rounded-3xl border border-[#4f673c] bg-[#142318] p-8 shadow-2xl">
          <h2 className="mb-6 text-3xl font-black">
            Tabla de posiciones
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#4f673c] text-left">
                  <th className="py-3">#</th>
                  <th>Equipo</th>
                  <th className="text-center">PTS</th>
                  <th className="text-center">PJ</th>
                  <th className="text-center">DG</th>
                </tr>
              </thead>

              <tbody>
                {tabla.map((equipo) => (
                  <tr
                    key={equipo.equipo}
                    className="border-b border-[#33462b]"
                  >
                    <td className="py-3">{equipo.posicion}</td>
                    <td>{equipo.equipo}</td>
                    <td className="text-center font-bold text-[#D6B46A]">
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
        </section>

        {/* RESULTADOS */}

        <section className="mt-8 rounded-3xl border border-[#4f673c] bg-[#142318] p-8 shadow-2xl">
          <h2 className="mb-6 text-3xl font-black">
            Últimos resultados
          </h2>

          <div className="space-y-4">
            {partidosLiga.map((partido) => (
              <Link
                key={partido.id}
                href={`/partidos/${partido.id}`}
                className="flex items-center justify-between rounded-2xl border border-[#33462b] bg-[#101d14] p-4 transition hover:border-[#D6B46A]/50"
              >
                <span>{partido.local}</span>

                <span className="text-xl font-black text-[#D6B46A]">
                  {partido.golesLocal} - {partido.golesVisitante}
                </span>

                <span>{partido.visitante}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* PRÓXIMOS */}

        <section className="mt-8 rounded-3xl border border-[#4f673c] bg-[#142318] p-8 shadow-2xl">
          <h2 className="mb-6 text-3xl font-black">
            Próximos partidos
          </h2>

          <div className="space-y-4">
            {proximosLiga.map((partido, index) => (
              <div
                key={`${partido.local}-${index}`}
                className="flex items-center justify-between rounded-2xl border border-[#33462b] bg-[#101d14] p-4"
              >
                <span>{partido.local}</span>

                <span className="font-bold text-[#D6B46A]">
                  {partido.fecha} · {partido.hora}
                </span>

                <span>{partido.visitante}</span>
              </div>
            ))}
          </div>
        </section>

        {/* EQUIPOS */}

        <section className="mt-8 rounded-3xl border border-[#4f673c] bg-[#142318] p-8 shadow-2xl">
          <h2 className="mb-6 text-3xl font-black">
            Equipos participantes
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {equiposLiga.map((equipo) => (
              <Link
                key={equipo.slug}
                href={`/equipos/${equipo.slug}`}
                className="rounded-2xl border border-[#33462b] bg-[#101d14] p-4 text-center transition hover:border-[#D6B46A]/50"
              >
                <p className="font-bold">
                  {equipo.nombre}
                </p>

                <p className="mt-2 text-sm text-[#879783]">
                  Ver club →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}