import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Badge from "../../components/ui/Badge";

import { competiciones } from "../../data/competiciones";
import { partidos } from "../../data/partidos";
import { proximos } from "../../data/proximos";
import { equipos } from "../../data/equipos";
import { noticias } from "../../data/noticias";

import { calcularTabla } from "../../lib/calcularTabla";
import { obtenerEquipoPorNombre } from "../../lib/obtenerEquipos";

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
    (partido) => partido.liga === nombreLiga
  );

  const proximosLiga = proximos.filter(
    (partido) => partido.liga === nombreLiga
  );

  const equiposLiga = Object.values(equipos).filter(
    (equipo) => equipo.liga === nombreLiga
  );

  const noticiasLiga = noticias.filter(
    (noticia) => noticia.categoria === competencia.nombre
  );

  const ligaVariant =
    nombreLiga === "Chacarera"
      ? "chacarera"
      : nombreLiga === "Regional Amateur"
      ? "regional"
      : "catamarquena";

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

        {/* CABECERA DE LA LIGA */}

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

          <div className="absolute inset-0 bg-gradient-to-r from-[#3F6B3C]/45 via-[#142318] to-[#A65E2E]/25" />

          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D6B46A]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-12 text-center md:flex-row md:px-12 md:py-14 md:text-left">

            <Image
              src={competencia.logo}
              alt={competencia.nombre}
              width={170}
              height={170}
              priority
              className="h-36 w-36 object-contain drop-shadow-2xl md:h-44 md:w-44"
            />

            <div className="flex-1">

              <Badge variant={ligaVariant}>
                Competencia oficial
              </Badge>

              <h1 className="mt-5 text-4xl font-black md:text-6xl">
                {competencia.nombre}
              </h1>

              <p className="mt-3 text-lg font-semibold text-[#aab6a5]">
                Todo el campeonato en un solo lugar
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">

                {competencia.categorias.map((categoria) => (
                  <div
                    key={categoria.nombre}
                    className="rounded-2xl border border-[#4f673c] bg-[#101d14]/85 px-5 py-4"
                  >
                    <p className="font-black text-[#F5F1E8]">
                      {categoria.nombre}
                    </p>

                    <p className="mt-1 text-sm text-[#aab6a5]">
                      {categoria.equipos} equipos
                    </p>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </section>

        {/* CONTENIDO PRINCIPAL */}

        <section className="mt-8 grid gap-8 lg:grid-cols-3">

          <div className="space-y-8 lg:col-span-2">

            {/* ÚLTIMOS RESULTADOS */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="flex flex-col gap-3 border-b border-[#4f673c] px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                    Centro de la fecha
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Últimos resultados
                  </h2>
                </div>

                <Badge variant={ligaVariant}>
                  {nombreLiga}
                </Badge>

              </div>

              {partidosLiga.length > 0 ? (
                <div className="divide-y divide-[#33462b]">

                  {partidosLiga.map((partido) => {
                    const local = obtenerEquipoPorNombre(partido.local);
                    const visitante = obtenerEquipoPorNombre(
                      partido.visitante
                    );

                    return (
                      <Link
                        key={partido.id}
                        href={`/partidos/${partido.id}`}
                        className="group block px-5 py-5 transition hover:bg-[#1a2d1e] md:px-8"
                      >

                        <div className="mb-4 flex items-center justify-between gap-3">

                          <span className="text-xs font-semibold text-[#aab6a5]">
                            {partido.categoria}
                          </span>

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
                                width={46}
                                height={46}
                                className="h-11 w-11 shrink-0 object-contain"
                              />
                            )}

                            <p className="truncate text-sm font-black md:text-base">
                              {local?.nombreCorto ?? partido.local}
                            </p>

                          </div>

                          <div className="rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3">

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
                                width={46}
                                height={46}
                                className="h-11 w-11 shrink-0 object-contain"
                              />
                            )}

                          </div>

                        </div>

                        <div className="mt-4 flex flex-col gap-1 border-t border-[#33462b] pt-3 text-xs text-[#879783] sm:flex-row sm:justify-between">

                          <span>{partido.fecha}</span>

                          <span>{partido.estadio}</span>

                        </div>

                      </Link>
                    );
                  })}

                </div>
              ) : (
                <p className="px-6 py-8 text-[#aab6a5]">
                  Todavía no hay resultados cargados para esta liga.
                </p>
              )}

            </section>

            {/* PRÓXIMOS PARTIDOS */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-6 py-6 md:px-8">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Agenda
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Próximos partidos
                </h2>

              </div>

              {proximosLiga.length > 0 ? (
                <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-8">

                  {proximosLiga.map((partido, index) => {
                    const local = obtenerEquipoPorNombre(partido.local);
                    const visitante = obtenerEquipoPorNombre(
                      partido.visitante
                    );

                    return (
                      <article
                        key={`${partido.local}-${partido.visitante}-${index}`}
                        className="rounded-2xl border border-[#33462b] bg-[#101d14] p-5"
                      >

                        <div className="flex items-center justify-between gap-3">

                          <Badge variant="upcoming">
                            Próximo
                          </Badge>

                          <p className="text-xs font-bold text-[#aab6a5]">
                            {partido.fecha}
                          </p>

                        </div>

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
                              {local?.nombreCorto ?? partido.local}
                            </p>

                          </div>

                          <div className="text-center">

                            <p className="font-black text-[#D6B46A]">
                              {partido.hora}
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
                                partido.visitante}
                            </p>

                          </div>

                        </div>

                        <p className="mt-5 truncate border-t border-[#33462b] pt-4 text-center text-xs text-[#879783]">
                          {partido.estadio}
                        </p>

                      </article>
                    );
                  })}

                </div>
              ) : (
                <p className="px-6 py-8 text-[#aab6a5]">
                  No hay próximos partidos cargados.
                </p>
              )}

            </section>

            {/* EQUIPOS PARTICIPANTES */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-6 py-6 md:px-8">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Instituciones
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Equipos participantes
                </h2>

              </div>

              {equiposLiga.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 md:p-8">

                  {equiposLiga.map((equipo) => (
                    <Link
                      key={equipo.slug}
                      href={`/equipos/${equipo.slug}`}
                      className="group flex flex-col items-center rounded-2xl border border-[#33462b] bg-[#101d14] p-5 text-center transition hover:border-[#D6B46A]/60 hover:bg-[#1a2d1e]"
                    >

                      <Image
                        src={equipo.escudo}
                        alt={equipo.nombre}
                        width={76}
                        height={76}
                        className="h-16 w-16 object-contain transition group-hover:-translate-y-1"
                      />

                      <p className="mt-4 text-sm font-black">
                        {equipo.nombreCorto}
                      </p>

                      <p className="mt-1 text-xs text-[#879783]">
                        {equipo.categoria}
                      </p>

                    </Link>
                  ))}

                </div>
              ) : (
                <p className="px-6 py-8 text-[#aab6a5]">
                  No hay equipos cargados para esta liga.
                </p>
              )}

            </section>

            {/* NOTICIAS DE LA LIGA */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-6 py-6 md:px-8">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Actualidad
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Noticias de la liga
                </h2>

              </div>

              {noticiasLiga.length > 0 ? (
                <div className="grid gap-5 p-5 sm:grid-cols-2 md:p-8">

                  {noticiasLiga.map((noticia) => (
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
                          {noticia.fecha}
                        </p>

                        <h3 className="mt-3 text-lg font-black">
                          {noticia.titulo}
                        </h3>

                        <p className="mt-3 text-sm text-[#aab6a5]">
                          {noticia.descripcion}
                        </p>

                      </div>

                    </Link>
                  ))}

                </div>
              ) : (
                <p className="px-6 py-8 text-[#aab6a5]">
                  Todavía no hay noticias de esta liga.
                </p>
              )}

            </section>

          </div>

          {/* SIDEBAR */}

          <aside className="space-y-8">

            {/* TABLA */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-5 py-5">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Clasificación
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Tabla de posiciones
                </h2>

              </div>

              {tabla.length > 0 ? (
                <div className="divide-y divide-[#33462b]">

                  {tabla.slice(0, 8).map((fila, index) => {
                    const equipo = obtenerEquipoPorNombre(fila.equipo);
                    const esLider = index === 0;

                    return (
                      <div
                        key={fila.equipo}
                        className={`relative grid grid-cols-[28px_1fr_auto] items-center gap-3 px-5 py-4 ${
                          esLider
                            ? "bg-[#1d3422]"
                            : "transition hover:bg-[#1a2d1e]"
                        }`}
                      >

                        {esLider && (
                          <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#D6B46A]" />
                        )}

                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                            esLider
                              ? "bg-[#D6B46A] text-[#142318]"
                              : "bg-[#263a29] text-[#aab6a5]"
                          }`}
                        >
                          {fila.posicion}
                        </div>

                        <div className="flex min-w-0 items-center gap-3">

                          {equipo && (
                            <Image
                              src={equipo.escudo}
                              alt={equipo.nombre}
                              width={32}
                              height={32}
                              className="h-8 w-8 shrink-0 object-contain"
                            />
                          )}

                          <div className="min-w-0">

                            <p className="truncate text-sm font-black">
                              {equipo?.nombreCorto ?? fila.equipo}
                            </p>

                            <p className="mt-1 text-[11px] text-[#879783]">
                              {fila.pj} PJ · DG{" "}
                              {fila.dg > 0 ? `+${fila.dg}` : fila.dg}
                            </p>

                          </div>

                        </div>

                        <div className="text-right">

                          <p className="text-lg font-black text-[#D6B46A]">
                            {fila.pts}
                          </p>

                          <p className="text-[10px] font-bold uppercase text-[#879783]">
                            Pts
                          </p>

                        </div>

                      </div>
                    );
                  })}

                </div>
              ) : (
                <p className="px-5 py-7 text-sm text-[#aab6a5]">
                  Todavía no hay resultados suficientes para calcular la tabla.
                </p>
              )}

            </section>

            {/* RESUMEN DE LA COMPETENCIA */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-5 py-5">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Competencia
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Información general
                </h2>

              </div>

              <div className="divide-y divide-[#33462b]">

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Liga
                  </p>

                  <p className="mt-1 font-black">
                    {competencia.nombre}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Equipos cargados
                  </p>

                  <p className="mt-1 font-black">
                    {equiposLiga.length}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Resultados cargados
                  </p>

                  <p className="mt-1 font-black">
                    {partidosLiga.length}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-bold uppercase text-[#879783]">
                    Próximos partidos
                  </p>

                  <p className="mt-1 font-black">
                    {proximosLiga.length}
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