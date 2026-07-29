import Image from "next/image";
import Link from "next/link";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Badge from "../components/ui/Badge";

import { competiciones } from "../data/competiciones";

export default function LigasPage() {
  const listaCompeticiones = Object.values(competiciones);

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
              Competiciones
            </Badge>

            <h1 className="mt-5 text-4xl font-black md:text-6xl">
              Ligas de Catamarca
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#aab6a5]">
              Accedé a los resultados, próximos partidos, tablas, equipos y
              noticias de cada competencia.
            </p>
          </div>
        </section>

        {/* LISTADO DE LIGAS */}

        <section className="mt-8">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
              Torneos disponibles
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Elegí una liga
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {listaCompeticiones.map((competencia) => {
              const variante =
                competencia.slug === "chacarera"
                  ? "chacarera"
                  : competencia.slug === "regional-amateur"
                    ? "regional"
                    : "catamarquena";

              return (
                <Link
                  key={competencia.slug}
                  href={`/ligas/${competencia.slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] p-6 shadow-2xl transition hover:-translate-y-1 hover:border-[#D6B46A]/60 md:p-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3F6B3C]/20 via-transparent to-[#A65E2E]/15" />

                  <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-[#4f673c] bg-[#101d14]">
                      <Image
                        src={competencia.logo}
                        alt={competencia.nombre}
                        width={90}
                        height={90}
                        className="h-20 w-20 object-contain transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1">
                      <Badge variant={variante}>
                        Liga oficial
                      </Badge>

                      <h2 className="mt-4 text-2xl font-black md:text-3xl">
                        {competencia.nombre}
                      </h2>

                      <p className="mt-3 text-sm leading-6 text-[#aab6a5]">
                        Fecha actual: {competencia.fechaActual}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {competencia.categorias.map((categoria) => (
                          <span
                            key={categoria.nombre}
                            className="rounded-full border border-[#33462b] bg-[#101d14] px-3 py-2 text-xs font-bold text-[#c7d0c2]"
                          >
                            {categoria.nombre} · {categoria.equipos} equipos
                          </span>
                        ))}
                      </div>

                      <p className="mt-6 font-black text-[#D6B46A]">
                        Ver competencia →
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}