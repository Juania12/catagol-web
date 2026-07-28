import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { noticias } from "../../data/noticias";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Badge from "../../components/ui/Badge";
import { calcularTabla } from "../../lib/calcularTabla";
import { obtenerEstadoForma } from "../../lib/obtenerEstadoForma";

import { equipos } from "../../data/equipos";
import { proximos } from "../../data/proximos";

import { obtenerEstadisticasEquipo } from "../../lib/calcularTabla";
import {
  obtenerPartidosEquipo,
  obtenerFormaEquipo,
} from "../../lib/obtenerPartidosEquipo";
import { obtenerEquipoPorNombre } from "../../lib/obtenerEquipos";

type Props = {
  params: Promise<{
    nombre: string;
  }>;
};

export default async function EquipoPage({ params }: Props) {
  const { nombre } = await params;

  const equipo = Object.values(equipos).find(
    (item) => item.slug === nombre
  );

  if (!equipo) {
    notFound();
  }

  const estadisticas = obtenerEstadisticasEquipo(equipo.nombreCorto);
const tablaLiga = calcularTabla(equipo.liga);

const posicionEquipo = tablaLiga.find(
  (fila) => fila.equipo === equipo.nombreCorto
);

  const ultimosPartidos = obtenerPartidosEquipo(
    equipo.nombreCorto
  ).slice(-5).reverse();

  const forma = obtenerFormaEquipo(equipo.nombreCorto);
const estadoForma = obtenerEstadoForma(equipo.nombreCorto);

  const proximoPartido = proximos.find(
    (partido) =>
      partido.local === equipo.nombreCorto ||
      partido.visitante === equipo.nombreCorto
  );
const noticiasDelClub = noticias.filter((noticia) =>
  noticia.equiposRelacionados.includes(equipo.nombreCorto)
);
  const ligaVariant =
    equipo.liga === "Chacarera"
      ? "chacarera"
      : equipo.liga === "Regional Amateur"
      ? "regional"
      : "catamarquena";

  return (
    <main className="min-h-screen bg-[#0d1b12] text-[#F5F1E8]">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">

        <Link
          href="/equipos"
          className="inline-flex text-sm font-bold text-[#D6B46A] transition hover:text-[#ead292]"
        >
          ← Volver a Equipos
        </Link>

        {/* CABECERA DEL CLUB */}

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

          <div className="absolute inset-0 bg-gradient-to-r from-[#3F6B3C]/45 via-[#142318] to-[#A65E2E]/25" />

          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D6B46A]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center px-6 py-12 text-center md:py-16">

            <Badge variant={ligaVariant}>
              {equipo.liga}
            </Badge>

            <Image
              src={equipo.escudo}
              alt={equipo.nombre}
              width={190}
              height={190}
              priority
              className="mt-7 h-36 w-36 object-contain drop-shadow-2xl md:h-44 md:w-44"
            />

            <h1 className="mt-7 text-4xl font-black md:text-6xl">
              {equipo.nombre}
            </h1>

            <p className="mt-3 text-lg font-semibold text-[#aab6a5]">
              {equipo.categoria}
            </p>

            <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-[#4f673c] bg-[#101d14]/80 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#879783]">
                  Ciudad
                </p>

                <p className="mt-2 font-black">
                  {equipo.ciudad}
                </p>
              </div>

              <div className="rounded-2xl border border-[#4f673c] bg-[#101d14]/80 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#879783]">
                  Departamento
                </p>

                <p className="mt-2 font-black">
                  {equipo.departamento}
                </p>
              </div>

              <div className="rounded-2xl border border-[#4f673c] bg-[#101d14]/80 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#879783]">
                  Fundación
                </p>

                <p className="mt-2 font-black">
                  {equipo.fundacion}
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* CONTENIDO PRINCIPAL */}

        <section className="mt-8 grid gap-8 lg:grid-cols-3">

          <div className="space-y-8 lg:col-span-2">

            {/* ESTADÍSTICAS */}

            <section className="rounded-3xl border border-[#4f673c] bg-[#142318] p-6 shadow-2xl md:p-8">

              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                Rendimiento
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Estadísticas del equipo
              </h2>

              {estadisticas ? (
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

                  {[
                    ["PJ", estadisticas.pj],
                    ["PG", estadisticas.pg],
                    ["PE", estadisticas.pe],
                    ["PP", estadisticas.pp],
                    ["GF", estadisticas.gf],
                    ["GC", estadisticas.gc],
                    [
                      "DG",
                      estadisticas.dg > 0
                        ? `+${estadisticas.dg}`
                        : estadisticas.dg,
                    ],
                    ["PTS", estadisticas.pts],
                  ].map(([nombreEstadistica, valor]) => (
                    <div
                      key={nombreEstadistica}
                      className="rounded-2xl border border-[#33462b] bg-[#101d14] p-4 text-center"
                    >
                      <p className="text-xs font-black uppercase text-[#879783]">
                        {nombreEstadistica}
                      </p>

                      <p
                        className={`mt-2 text-2xl font-black ${
                          nombreEstadistica === "PTS"
                            ? "text-[#D6B46A]"
                            : "text-[#F5F1E8]"
                        }`}
                      >
                        {valor}
                      </p>
                    </div>
                  ))}

                </div>
              ) : (
                <p className="mt-6 text-[#aab6a5]">
                  Todavía no hay estadísticas disponibles.
                </p>
              )}

            </section>

            {/* FORMA */}

            <section className="rounded-3xl border border-[#4f673c] bg-[#142318] p-6 shadow-2xl md:p-8">

              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                Últimos encuentros
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Forma reciente
              </h2>

              {forma.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-3">

                  {forma.map((resultado, index) => (
                    <div
                      key={`${resultado}-${index}`}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-black ${
                        resultado === "G"
                          ? "border-green-500/50 bg-green-500/20 text-green-300"
                          : resultado === "E"
                          ? "border-[#D6B46A]/50 bg-[#D6B46A]/15 text-[#D6B46A]"
                          : "border-red-500/50 bg-red-500/20 text-red-300"
                      }`}
                    >
                      {resultado}
                    </div>
                  ))}

                </div>
              ) : (
                <p className="mt-6 text-[#aab6a5]">
                  Todavía no hay partidos registrados.
                </p>
              )}

            </section>
<section className="rounded-3xl border border-[#4f673c] bg-[#142318] p-6 shadow-2xl md:p-8">

  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
    Estado de forma
  </p>

  <h2 className="mt-2 text-2xl font-black">
    Momento del equipo
  </h2>

  <div className="mt-7 space-y-4">

    <div className="flex items-center justify-between rounded-2xl border border-[#33462b] bg-[#101d14] p-4">
      <span>Invicto</span>

      <span className="font-black text-[#D6B46A]">
        {estadoForma.invicto} partidos
      </span>
    </div>

    <div className="flex items-center justify-between rounded-2xl border border-[#33462b] bg-[#101d14] p-4">
      <span>Victorias (últimos 5)</span>

      <span className="font-black text-[#D6B46A]">
        {estadoForma.victoriasUltimos5}
      </span>
    </div>

    <div className="flex items-center justify-between rounded-2xl border border-[#33462b] bg-[#101d14] p-4">
      <span>Goles convertidos</span>

      <span className="font-black text-[#D6B46A]">
        {estadoForma.golesFavor}
      </span>
    </div>

    <div className="flex items-center justify-between rounded-2xl border border-[#33462b] bg-[#101d14] p-4">
      <span>Goles recibidos</span>

      <span className="font-black text-[#D6B46A]">
        {estadoForma.golesContra}
      </span>
    </div>

  </div>

  <div className="mt-8 rounded-2xl border border-[#4f673c] bg-[#101d14] p-5">

    <p className="text-sm font-bold text-[#D6B46A] uppercase">
      Análisis
    </p>

    <p className="mt-3 leading-7 text-[#c7d0c2]">
      {estadoForma.mensaje}
    </p>

  </div>

</section>
            {/* ÚLTIMOS PARTIDOS */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-6 py-6 md:px-8">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Resultados
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Últimos partidos
                </h2>

              </div>

              {ultimosPartidos.length > 0 ? (
                <div className="divide-y divide-[#33462b]">

                  {ultimosPartidos.map((partido) => {
                    const local = obtenerEquipoPorNombre(partido.local);
                    const visitante = obtenerEquipoPorNombre(
                      partido.visitante
                    );

                    return (
                      <Link
                        key={partido.id}
                        href={`/partidos/${partido.id}`}
                        className="block px-5 py-5 transition hover:bg-[#1a2d1e] md:px-8"
                      >

                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">

                          <div className="flex min-w-0 items-center gap-3">

                            {local && (
                              <Image
                                src={local.escudo}
                                alt={local.nombre}
                                width={38}
                                height={38}
                                className="h-9 w-9 shrink-0 object-contain"
                              />
                            )}

                            <p className="truncate text-sm font-black">
                              {local?.nombreCorto ?? partido.local}
                            </p>

                          </div>

                          <div className="rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-2">

                            <p className="whitespace-nowrap text-xl font-black text-[#D6B46A]">
                              {partido.golesLocal}
                              <span className="mx-2 text-[#71806d]">
                                —
                              </span>
                              {partido.golesVisitante}
                            </p>

                          </div>

                          <div className="flex min-w-0 items-center justify-end gap-3">

                            <p className="truncate text-right text-sm font-black">
                              {visitante?.nombreCorto ??
                                partido.visitante}
                            </p>

                            {visitante && (
                              <Image
                                src={visitante.escudo}
                                alt={visitante.nombre}
                                width={38}
                                height={38}
                                className="h-9 w-9 shrink-0 object-contain"
                              />
                            )}

                          </div>

                        </div>

                        <div className="mt-4 flex flex-col gap-1 text-xs text-[#879783] sm:flex-row sm:justify-between">

                          <span>{partido.fecha}</span>

                          <span>{partido.estadio}</span>

                        </div>

                      </Link>
                    );
                  })}

                </div>
              ) : (
                <p className="px-6 py-8 text-[#aab6a5]">
                  No hay partidos registrados.
                </p>
              )}

            </section>

          </div>

{/* NOTICIAS DEL CLUB */}

<section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">
  <div className="border-b border-[#4f673c] px-6 py-6 md:px-8">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
      Actualidad
    </p>

    <h2 className="mt-2 text-2xl font-black">
      Noticias del club
    </h2>
  </div>

  {noticiasDelClub.length > 0 ? (
    <div className="grid gap-5 p-5 md:grid-cols-2 md:p-8">
      {noticiasDelClub.map((noticia) => (
        <Link
          key={noticia.id}
          href={`/noticias/${noticia.id}`}
          className="group overflow-hidden rounded-2xl border border-[#33462b] bg-[#101d14] transition hover:border-[#D6B46A]/60"
        >
          <div className="relative h-44 overflow-hidden">
            <Image
              src={noticia.imagen}
              alt={noticia.titulo}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#101d14] via-transparent to-transparent" />
          </div>

          <div className="p-5">
            <p className="text-xs font-black uppercase tracking-wide text-[#D6B46A]">
              {noticia.categoria}
            </p>

            <h3 className="mt-3 text-lg font-black text-[#F5F1E8]">
              {noticia.titulo}
            </h3>

            <p className="mt-3 text-sm text-[#aab6a5]">
              {noticia.descripcion}
            </p>

            <p className="mt-4 text-xs font-bold text-[#879783]">
              {noticia.fecha}
            </p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <p className="px-6 py-8 text-[#aab6a5]">
      Todavía no hay noticias relacionadas con este club.
    </p>
  )}
</section>

          {/* SIDEBAR DEL CLUB */}

          <aside className="space-y-8">

{/* POSICIÓN EN LA TABLA */}

<section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">
  <div className="border-b border-[#4f673c] px-5 py-5">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
      Campeonato
    </p>

    <h2 className="mt-2 text-xl font-black">
      Posición en la tabla
    </h2>
  </div>

  {posicionEquipo ? (
    <div className="p-6 text-center">
      <div
        className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border text-4xl font-black ${
          posicionEquipo.posicion === 1
            ? "border-[#D6B46A] bg-[#D6B46A]/15 text-[#D6B46A]"
            : posicionEquipo.posicion === 2
            ? "border-slate-400 bg-slate-400/10 text-slate-300"
            : posicionEquipo.posicion === 3
            ? "border-[#b8784e] bg-[#b8784e]/15 text-[#d79a71]"
            : "border-[#4f673c] bg-[#1a2d1e] text-[#F5F1E8]"
        }`}
      >
        {posicionEquipo.posicion}°
      </div>

      {posicionEquipo.posicion === 1 && (
        <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#D6B46A]">
          Líder del campeonato
        </p>
      )}

      <p className="mt-5 text-lg font-black">
        {equipo.liga}
      </p>

      <p className="mt-2 text-3xl font-black text-[#D6B46A]">
        {posicionEquipo.pts}
      </p>

      <p className="text-xs font-bold uppercase tracking-wide text-[#879783]">
        puntos
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#33462b] bg-[#101d14] p-3">
          <p className="text-xs font-bold uppercase text-[#879783]">
            PJ
          </p>

          <p className="mt-1 text-xl font-black">
            {posicionEquipo.pj}
          </p>
        </div>

        <div className="rounded-xl border border-[#33462b] bg-[#101d14] p-3">
          <p className="text-xs font-bold uppercase text-[#879783]">
            DG
          </p>

          <p className="mt-1 text-xl font-black">
            {posicionEquipo.dg > 0
              ? `+${posicionEquipo.dg}`
              : posicionEquipo.dg}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <p className="px-5 py-7 text-sm text-[#aab6a5]">
      Este equipo todavía no aparece en la tabla.
    </p>
  )}

  <Link
    href={`/ligas/${equipo.liga
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")}`}
    className="block border-t border-[#4f673c] px-5 py-4 text-center text-sm font-black text-[#D6B46A] transition hover:bg-[#1b3020] hover:text-[#ead292]"
  >
    Ver tabla completa →
  </Link>
</section>

            {/* PRÓXIMO PARTIDO */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-5 py-5">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Agenda
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Próximo partido
                </h2>

              </div>

              {proximoPartido ? (() => {
                const local = obtenerEquipoPorNombre(
                  proximoPartido.local
                );

                const visitante = obtenerEquipoPorNombre(
                  proximoPartido.visitante
                );

                return (
                  <div className="p-5">

                    <Badge variant="upcoming">
                      Próximo
                    </Badge>

                    <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">

                      <div className="flex min-w-0 flex-col items-center">

                        {local && (
                          <Image
                            src={local.escudo}
                            alt={local.nombre}
                            width={58}
                            height={58}
                            className="h-14 w-14 object-contain"
                          />
                        )}

                        <p className="mt-3 max-w-full truncate text-center text-sm font-black">
                          {local?.nombreCorto ??
                            proximoPartido.local}
                        </p>

                      </div>

                      <div className="text-center">

                        <p className="font-black text-[#D6B46A]">
                          {proximoPartido.hora}
                        </p>

                        <p className="mt-2 text-xs font-bold uppercase text-[#879783]">
                          VS
                        </p>

                      </div>

                      <div className="flex min-w-0 flex-col items-center">

                        {visitante && (
                          <Image
                            src={visitante.escudo}
                            alt={visitante.nombre}
                            width={58}
                            height={58}
                            className="h-14 w-14 object-contain"
                          />
                        )}

                        <p className="mt-3 max-w-full truncate text-center text-sm font-black">
                          {visitante?.nombreCorto ??
                            proximoPartido.visitante}
                        </p>

                      </div>

                    </div>

                    <div className="mt-6 border-t border-[#33462b] pt-4 text-center">

                      <p className="text-sm font-bold">
                        {proximoPartido.fecha}
                      </p>

                      <p className="mt-2 text-xs text-[#879783]">
                        {proximoPartido.estadio}
                      </p>

                    </div>

                  </div>
                );
              })() : (
                <p className="px-5 py-7 text-sm text-[#aab6a5]">
                  No hay un próximo partido cargado.
                </p>
              )}

            </section>

            {/* INFORMACIÓN DEL CLUB */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-5 py-5">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Institución
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Información del club
                </h2>

              </div>

              <div className="divide-y divide-[#33462b]">

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Nombre
                  </p>

                  <p className="mt-1 font-black">
                    {equipo.nombre}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Liga
                  </p>

                  <p className="mt-1 font-black">
                    {equipo.liga}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Categoría
                  </p>

                  <p className="mt-1 font-black">
                    {equipo.categoria}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Ubicación
                  </p>

                  <p className="mt-1 font-black">
                    {equipo.ciudad}, {equipo.departamento}
                  </p>
                </div>

              </div>

            </section>

          </aside>

        </section>

      </div>

      <Footer />
    </main>
  );
}