import Image from "next/image";
import Link from "next/link";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Badge from "../components/ui/Badge";

import { noticias } from "../data/noticias";

export default function NoticiasPage() {
  const principal = noticias[0];
  const secundarias = noticias.slice(1);

  return (
    <main className="min-h-screen bg-[#0d1b12] text-[#F5F1E8]">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">

        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
            CATAGOL Noticias
          </p>

          <h1 className="mt-2 text-4xl font-black md:text-6xl">
            Toda la actualidad
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-[#aab6a5]">
            Noticias, novedades y protagonistas del fútbol catamarqueño.
          </p>
        </div>

        {principal && (
          <Link
            href={`/noticias/${principal.id}`}
            className="group block overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl"
          >
            <div className="relative h-[360px] overflow-hidden md:h-[520px]">

              <Image
                src={principal.imagen}
                alt={principal.titulo}
                fill
                priority
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#142318] via-[#142318]/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">

                <div className="flex flex-wrap items-center gap-3">

                  <Badge
                    variant={
                      principal.categoria === "Liga Chacarera"
                        ? "chacarera"
                        : principal.categoria === "Regional Amateur"
                        ? "regional"
                        : "catamarquena"
                    }
                  >
                    {principal.categoria}
                  </Badge>

                  <span className="text-sm font-bold text-[#d8dfd4]">
                    {principal.fecha}
                  </span>

                </div>

                <h2 className="mt-5 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
                  {principal.titulo}
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-7 text-[#d8dfd4] md:text-lg">
                  {principal.descripcion}
                </p>

                <p className="mt-6 font-black text-[#D6B46A]">
                  Leer noticia →
                </p>

              </div>

            </div>
          </Link>
        )}

        <section className="mt-8">

          <div className="mb-6 flex items-center justify-between gap-4">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                Últimas publicaciones
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Más noticias
              </h2>
            </div>

            <Link
              href="/v2"
              className="text-sm font-bold text-[#D6B46A] transition hover:text-[#ead292]"
            >
              Volver a la Home →
            </Link>

          </div>

          {secundarias.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {secundarias.map((noticia) => (

                <Link
                  key={noticia.id}
                  href={`/noticias/${noticia.id}`}
                  className="group overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl transition hover:border-[#D6B46A]/60"
                >

                  <div className="relative h-56 overflow-hidden">

                    <Image
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#142318] via-transparent to-transparent" />

                    <div className="absolute left-4 top-4">

                      <Badge
                        variant={
                          noticia.categoria === "Liga Chacarera"
                            ? "chacarera"
                            : noticia.categoria === "Regional Amateur"
                            ? "regional"
                            : "catamarquena"
                        }
                      >
                        {noticia.categoria}
                      </Badge>

                    </div>

                  </div>

                  <div className="p-6">

                    <p className="text-xs font-bold uppercase tracking-wide text-[#879783]">
                      {noticia.fecha}
                    </p>

                    <h3 className="mt-3 text-xl font-black leading-7">
                      {noticia.titulo}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-[#aab6a5]">
                      {noticia.descripcion}
                    </p>

                    <p className="mt-5 font-black text-[#D6B46A]">
                      Leer nota →
                    </p>

                  </div>

                </Link>

              ))}

            </div>
          ) : (
            <p className="rounded-3xl border border-[#4f673c] bg-[#142318] p-8 text-[#aab6a5]">
              Todavía no hay más noticias publicadas.
            </p>
          )}

        </section>

      </div>

      <Footer />
    </main>
  );
}