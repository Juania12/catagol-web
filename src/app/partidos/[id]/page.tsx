import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MatchTimeline from "../../components/matches/MatchTimeline";
import { obtenerIncidenciasPartido } from "../../data/incidencias";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Badge from "../../components/ui/Badge";

import { partidos } from "../../data/partidos";
import { obtenerEquipoPorNombre } from "../../lib/obtenerEquipos";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PartidoPage({ params }: Props) {
  const { id } = await params;

  const partido = partidos.find((item) => item.id === id);

  if (!partido) {
    notFound();
  }

  const local = obtenerEquipoPorNombre(partido.local);
  const visitante = obtenerEquipoPorNombre(partido.visitante);

  if (!local || !visitante) {
    notFound();
  }
const incidencias = obtenerIncidenciasPartido(partido.id);

  const otrosPartidos = partidos
    .filter(
      (item) =>
        item.id !== partido.id &&
        item.liga === partido.liga
    )
    .slice(0, 3);

  const ligaVariant =
    partido.liga === "Chacarera"
      ? "chacarera"
      : partido.liga === "Regional Amateur"
      ? "regional"
      : "catamarquena";

  return (
    <main className="min-h-screen bg-[#0d1b12] text-[#F5F1E8]">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">

        <Link
          href="/v2"
          className="inline-flex items-center text-sm font-bold text-[#D6B46A] transition hover:text-[#ead292]"
        >
          ← Volver a la Home
        </Link>

        {/* MARCADOR PRINCIPAL */}

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

          <div className="absolute inset-0 bg-gradient-to-r from-[#3F6B3C]/30 via-[#142318] to-[#A65E2E]/20" />

          <div className="relative z-10 p-6 md:p-10">

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div className="flex flex-wrap items-center gap-3">

                <Badge variant={ligaVariant}>
                  {partido.liga}
                </Badge>

                <span className="text-sm font-semibold text-[#aab6a5]">
                  {partido.categoria}
                </span>

              </div>

              <Badge variant="final">
                Final
              </Badge>

            </div>

            <div className="mt-10 grid grid-cols-1 items-center gap-8 md:grid-cols-3">

              {/* LOCAL */}

              <Link
                href={`/equipos/${local.slug}`}
                className="flex flex-col items-center transition hover:-translate-y-1"
              >
                <Image
                  src={local.escudo}
                  alt={local.nombre}
                  width={150}
                  height={150}
                  priority
                  className="h-28 w-28 object-contain drop-shadow-2xl md:h-36 md:w-36"
                />

                <h1 className="mt-5 text-center text-2xl font-black md:text-3xl">
                  {local.nombre}
                </h1>
              </Link>

              {/* RESULTADO */}

              <div className="text-center">

                <p className="text-6xl font-black tracking-wide text-[#D6B46A] md:text-8xl">
                  {partido.golesLocal}
                  <span className="mx-4 text-[#F5F1E8]">—</span>
                  {partido.golesVisitante}
                </p>

                <div className="mx-auto mt-6 h-[2px] w-28 rounded-full bg-[#D6B46A]" />

                <p className="mt-6 text-base font-bold">
                  {partido.fecha}
                </p>

                <p className="mt-2 text-sm text-[#aab6a5]">
                  {partido.estadio}
                </p>

              </div>

              {/* VISITANTE */}

              <Link
                href={`/equipos/${visitante.slug}`}
                className="flex flex-col items-center transition hover:-translate-y-1"
              >
                <Image
                  src={visitante.escudo}
                  alt={visitante.nombre}
                  width={150}
                  height={150}
                  priority
                  className="h-28 w-28 object-contain drop-shadow-2xl md:h-36 md:w-36"
                />

                <h1 className="mt-5 text-center text-2xl font-black md:text-3xl">
                  {visitante.nombre}
                </h1>
              </Link>

            </div>

          </div>

        </section>

        {/* CONTENIDO */}

        <section className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* COLUMNA PRINCIPAL */}

          <div className="space-y-8 lg:col-span-2">

            {/* RESUMEN */}

            <section className="rounded-3xl border border-[#4f673c] bg-[#142318] p-6 shadow-2xl md:p-8">

              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                Resumen
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Resumen del partido
              </h2>

              <p className="mt-5 leading-7 text-[#c7d0c2]">
                {local.nombreCorto} se impuso por{" "}
                <strong className="text-[#F5F1E8]">
                  {partido.golesLocal} a {partido.golesVisitante}
                </strong>{" "}
                frente a {visitante.nombreCorto}, en un encuentro correspondiente
                a {partido.categoria} de la {partido.liga}.
              </p>

            </section>

            {/* INCIDENCIAS */}

            <section className="rounded-3xl border border-[#4f673c] bg-[#142318] p-6 shadow-2xl md:p-8">

              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                Cronología
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Incidencias
              </h2>

              <MatchTimeline incidencias={incidencias} />

            </section>

          </div>

          {/* SIDEBAR */}

          <aside className="space-y-8">

            {/* INFORMACIÓN */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-5 py-5">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Información
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Datos del encuentro
                </h2>

              </div>

              <div className="divide-y divide-[#33462b]">

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Liga
                  </p>

                  <p className="mt-1 font-black">
                    {partido.liga}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Categoría
                  </p>

                  <p className="mt-1 font-black">
                    {partido.categoria}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Fecha
                  </p>

                  <p className="mt-1 font-black">
                    {partido.fecha}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Estadio
                  </p>

                  <p className="mt-1 font-black">
                    {partido.estadio}
                  </p>
                </div>

              </div>

            </section>

            {/* OTROS PARTIDOS */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-5 py-5">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Más resultados
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Otros partidos
                </h2>

              </div>

              {otrosPartidos.length > 0 ? (
                <div className="divide-y divide-[#33462b]">

                  {otrosPartidos.map((otro) => (

                    <Link
                      key={otro.id}
                      href={`/partidos/${otro.id}`}
                      className="block px-5 py-4 transition hover:bg-[#1a2d1e]"
                    >

                      <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">

                          <p className="truncate text-sm font-black">
                            {otro.local}
                          </p>

                          <p className="mt-1 truncate text-sm font-black">
                            {otro.visitante}
                          </p>

                        </div>

                        <p className="shrink-0 text-xl font-black text-[#D6B46A]">
                          {otro.golesLocal} — {otro.golesVisitante}
                        </p>

                      </div>

                    </Link>

                  ))}

                </div>
              ) : (
                <p className="px-5 py-6 text-sm text-[#aab6a5]">
                  No hay otros partidos de esta liga.
                </p>
              )}

            </section>

          </aside>

        </section>

      </div>

      <Footer />
    </main>
  );
}