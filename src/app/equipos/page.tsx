import Image from "next/image";
import Link from "next/link";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Badge from "../components/ui/Badge";

import { equipos } from "../data/equipos";

export default function EquiposPage() {
  const listaEquipos = Object.values(equipos).sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

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
              Clubes
            </Badge>

            <h1 className="mt-5 text-4xl font-black md:text-6xl">
              Equipos de Catamarca
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#aab6a5]">
              Conocé los clubes, sus últimos resultados, próximos partidos y
              actualidad dentro de CATAGOL.
            </p>
          </div>
        </section>

        {/* LISTADO */}

        <section className="mt-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                Instituciones
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Todos los equipos
              </h2>
            </div>

            <p className="text-sm font-bold text-[#879783]">
              {listaEquipos.length} clubes cargados
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {listaEquipos.map((equipo) => {
              const ligaVariant =
                equipo.liga === "Chacarera"
                  ? "chacarera"
                  : equipo.liga === "Regional Amateur"
                  ? "regional"
                  : "catamarquena";

              return (
                <Link
                  key={equipo.slug}
                  href={`/equipos/${equipo.slug}`}
                  className="group flex min-h-64 flex-col items-center justify-between overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] p-5 text-center shadow-xl transition hover:-translate-y-1 hover:border-[#D6B46A]/60 hover:bg-[#1a2d1e]"
                >
                  <div className="flex w-full justify-center">
                    <Badge variant={ligaVariant}>
                      {equipo.liga}
                    </Badge>
                  </div>

                  <Image
                    src={equipo.escudo}
                    alt={equipo.nombre}
                    width={100}
                    height={100}
                    className="my-5 h-24 w-24 object-contain drop-shadow-2xl transition duration-300 group-hover:scale-105"
                  />

                  <div>
                    <h2 className="text-base font-black leading-6 text-[#F5F1E8]">
                      {equipo.nombre}
                    </h2>

                    <p className="mt-2 text-xs font-semibold text-[#879783]">
                      {equipo.ciudad}
                    </p>
                  </div>

                  <p className="mt-4 text-sm font-black text-[#D6B46A]">
                    Ver club →
                  </p>
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