import Image from "next/image";
import Link from "next/link";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Badge from "../components/ui/Badge";

import { partidos } from "../data/partidos";
import { proximos } from "../data/proximos";
import { obtenerEquipoPorNombre } from "../lib/obtenerEquipos";

export default function FixturePage() {
  const partidosPorFecha = partidos.reduce((acumulador, partido) => {
    if (!acumulador[partido.fecha]) {
      acumulador[partido.fecha] = [];
    }

    acumulador[partido.fecha].push(partido);

    return acumulador;
  }, {} as Record<string, typeof partidos>);

  const proximosPorFecha = proximos.reduce((acumulador, partido) => {
    if (!acumulador[partido.fecha]) {
      acumulador[partido.fecha] = [];
    }

    acumulador[partido.fecha].push(partido);

    return acumulador;
  }, {} as Record<string, typeof proximos>);

  return (
    <main className="min-h-screen bg-[#0d1b12] text-[#F5F1E8]">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <Link
          href="/v2"
          className="inline-flex text-sm font-bold text-[#D6B46A] transition hover:text-[#ead292]"
        >
          ← Volver a la Home
        </Link>

        {/* CABECERA */}

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3F6B3C]/45 via-[#142318] to-[#A65E2E]/25" />

          <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
            <Badge variant="catamarquena">
              Calendario
            </Badge>

            <h1 className="mt-5 text-4xl font-black md:text-6xl">
              Fixture y resultados
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#aab6a5]">
              Consultá los partidos disputados y los próximos encuentros del
              fútbol catamarqueño.
            </p>
          </div>
        </section>

        {/* PRÓXIMOS PARTIDOS */}

        <section className="mt-8 overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">
          <div className="border-b border-[#4f673c] px-6 py-6 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
              Agenda
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Próximos partidos
            </h2>
          </div>

          {Object.keys(proximosPorFecha).length > 0 ? (
            <div className="divide-y divide-[#4f673c]">
              {Object.entries(proximosPorFecha).map(([fecha, lista]) => (
                <div key={fecha} className="p-5 md:p-8">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-black">
                      {fecha}
                    </h3>

                    <Badge variant="upcoming">
                      Próxima fecha
                    </Badge>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {lista.map((partido, index) => {
                      const local = obtenerEquipoPorNombre(partido.local);
                      const visitante = obtenerEquipoPorNombre(
                        partido.visitante
                      );

                      const ligaVariant =
                        partido.liga === "Chacarera"
                          ? "chacarera"
                          : partido.liga === "Regional Amateur"
                          ? "regional"
                          : "catamarquena";

                      return (
                        <article
                          key={`${partido.local}-${partido.visitante}-${index}`}
                          className="rounded-2xl border border-[#33462b] bg-[#101d14] p-5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <Badge variant={ligaVariant}>
                              {partido.liga}
                            </Badge>

                            <span className="text-xs font-bold text-[#879783]">
                              {partido.estadio}
                            </span>
                          </div>

                          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                            <div className="flex min-w-0 flex-col items-center">
                              {local && (
                                <Image
                                  src={local.escudo}
                                  alt={local.nombre}
                                  width={62}
                                  height={62}
                                  className="h-14 w-14 object-contain"
                                />
                              )}

                              <p className="mt-3 max-w-full truncate text-center text-sm font-black">
                                {local?.nombreCorto ?? partido.local}
                              </p>
                            </div>

                            <div className="text-center">
                              <p className="text-xl font-black text-[#D6B46A]">
                                {partido.hora}
                              </p>

                              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#879783]">
                                VS
                              </p>
                            </div>

                            <div className="flex min-w-0 flex-col items-center">
                              {visitante && (
                                <Image
                                  src={visitante.escudo}
                                  alt={visitante.nombre}
                                  width={62}
                                  height={62}
                                  className="h-14 w-14 object-contain"
                                />
                              )}

                              <p className="mt-3 max-w-full truncate text-center text-sm font-black">
                                {visitante?.nombreCorto ?? partido.visitante}
                              </p>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-6 py-8 text-[#aab6a5]">
              No hay próximos partidos cargados.
            </p>
          )}
        </section>

        {/* PARTIDOS DISPUTADOS */}

        <section className="mt-8 overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">
          <div className="border-b border-[#4f673c] px-6 py-6 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
              Historial reciente
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Partidos disputados
            </h2>
          </div>

          {Object.keys(partidosPorFecha).length > 0 ? (
            <div className="divide-y divide-[#4f673c]">
              {Object.entries(partidosPorFecha).map(([fecha, lista]) => (
                <div key={fecha} className="p-5 md:p-8">
                  <h3 className="mb-5 text-xl font-black">
                    {fecha}
                  </h3>

                  <div className="space-y-4">
                    {lista.map((partido) => {
                      const local = obtenerEquipoPorNombre(partido.local);
                      const visitante = obtenerEquipoPorNombre(
                        partido.visitante
                      );

                      const ligaVariant =
                        partido.liga === "Chacarera"
                          ? "chacarera"
                          : partido.liga === "Regional Amateur"
                          ? "regional"
                          : "catamarquena";

                      return (
                        <Link
                          key={partido.id}
                          href={`/partidos/${partido.id}`}
                          className="group block rounded-2xl border border-[#33462b] bg-[#101d14] p-4 transition hover:border-[#D6B46A]/60 hover:bg-[#1a2d1e] md:p-5"
                        >
                          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <Badge variant={ligaVariant}>
                              {partido.liga}
                            </Badge>

                            <Badge variant="final">
                              Final
                            </Badge>
                          </div>

                          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
                            <div className="flex min-w-0 items-center gap-3">
                              {local && (
                                <Image
                                  src={local.escudo}
                                  alt={local.nombre}
                                  width={44}
                                  height={44}
                                  className="h-10 w-10 shrink-0 object-contain"
                                />
                              )}

                              <p className="truncate text-sm font-black md:text-base">
                                {local?.nombreCorto ?? partido.local}
                              </p>
                            </div>

                            <div className="rounded-xl border border-[#4f673c] bg-[#0d1b12] px-4 py-3">
                              <p className="whitespace-nowrap text-2xl font-black text-[#D6B46A]">
                                {partido.golesLocal}
                                <span className="mx-2 text-[#71806d]">
                                  —
                                </span>
                                {partido.golesVisitante}
                              </p>
                            </div>

                            <div className="flex min-w-0 items-center justify-end gap-3">
                              <p className="truncate text-right text-sm font-black md:text-base">
                                {visitante?.nombreCorto ??
                                  partido.visitante}
                              </p>

                              {visitante && (
                                <Image
                                  src={visitante.escudo}
                                  alt={visitante.nombre}
                                  width={44}
                                  height={44}
                                  className="h-10 w-10 shrink-0 object-contain"
                                />
                              )}
                            </div>
                          </div>

                          <div className="mt-4 flex flex-col gap-1 border-t border-[#33462b] pt-3 text-xs text-[#879783] sm:flex-row sm:justify-between">
                            <span>{partido.categoria}</span>
                            <span>{partido.estadio}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-6 py-8 text-[#aab6a5]">
              Todavía no hay partidos disputados.
            </p>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}