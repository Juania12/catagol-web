import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Badge from "../../components/ui/Badge";

import { noticias } from "../../data/noticias";
import { obtenerEquipoPorNombre } from "../../lib/obtenerEquipos";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NoticiaPage({ params }: Props) {
  const { id } = await params;

  const noticia = noticias.find((item) => item.id === id);

  if (!noticia) {
    notFound();
  }

  const noticiasRelacionadas = noticias
    .filter(
      (item) =>
        item.id !== noticia.id &&
        item.categoria === noticia.categoria
    )
    .slice(0, 3);

  const ligaVariant =
    noticia.categoria === "Liga Chacarera"
      ? "chacarera"
      : noticia.categoria === "Regional Amateur"
      ? "regional"
      : "catamarquena";

  const equiposRelacionados = noticia.equiposRelacionados
    .map((nombreEquipo) => obtenerEquipoPorNombre(nombreEquipo))
    .filter((equipo) => equipo !== undefined);

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

        {/* IMAGEN PRINCIPAL */}

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

          <div className="relative h-[320px] md:h-[480px]">

            <Image
              src={noticia.imagen}
              alt={noticia.titulo}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#142318] via-[#142318]/25 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">

              <div className="flex flex-wrap items-center gap-3">

                <Badge variant={ligaVariant}>
                  {noticia.categoria}
                </Badge>

                <span className="text-sm font-bold text-[#d8dfd4]">
                  {noticia.fecha}
                </span>

              </div>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight md:text-6xl">
                {noticia.titulo}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#d8dfd4] md:text-xl">
                {noticia.descripcion}
              </p>

            </div>

          </div>

        </section>

        {/* CONTENIDO */}

        <section className="mt-8 grid gap-8 lg:grid-cols-3">

          <article className="rounded-3xl border border-[#4f673c] bg-[#142318] p-6 shadow-2xl md:p-10 lg:col-span-2">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
              CATAGOL Noticias
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Desarrollo
            </h2>

            <div className="mt-7 space-y-6 text-base leading-8 text-[#c7d0c2] md:text-lg">

              <p>
                {noticia.descripcion}
              </p>

              <p>
                El encuentro dejó una jornada intensa para el fútbol
                catamarqueño y volvió a poner a los protagonistas en el centro
                de la escena.
              </p>

              <p>
                CATAGOL continuará siguiendo la actualidad de ambos equipos y
                publicará las novedades relacionadas con sus próximos
                compromisos.
              </p>

            </div>

          </article>

          <aside className="space-y-8">

            {/* EQUIPOS RELACIONADOS */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-5 py-5">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Protagonistas
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Equipos relacionados
                </h2>

              </div>

              {equiposRelacionados.length > 0 ? (
                <div className="divide-y divide-[#33462b]">

                  {equiposRelacionados.map((equipo) => (
                    <Link
                      key={equipo.slug}
                      href={`/equipos/${equipo.slug}`}
                      className="flex items-center gap-4 px-5 py-5 transition hover:bg-[#1a2d1e]"
                    >

                      <Image
                        src={equipo.escudo}
                        alt={equipo.nombre}
                        width={52}
                        height={52}
                        className="h-12 w-12 object-contain"
                      />

                      <div>

                        <p className="font-black">
                          {equipo.nombreCorto}
                        </p>

                        <p className="mt-1 text-xs text-[#879783]">
                          {equipo.liga}
                        </p>

                      </div>

                    </Link>
                  ))}

                </div>
              ) : (
                <p className="px-5 py-7 text-sm text-[#aab6a5]">
                  No hay equipos relacionados.
                </p>
              )}

            </section>

            {/* MÁS NOTICIAS */}

            <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

              <div className="border-b border-[#4f673c] px-5 py-5">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Seguir leyendo
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Más noticias
                </h2>

              </div>

              {noticiasRelacionadas.length > 0 ? (
                <div className="divide-y divide-[#33462b]">

                  {noticiasRelacionadas.map((item) => (
                    <Link
                      key={item.id}
                      href={`/noticias/${item.id}`}
                      className="block px-5 py-5 transition hover:bg-[#1a2d1e]"
                    >

                      <p className="text-sm font-black leading-6">
                        {item.titulo}
                      </p>

                      <p className="mt-2 text-xs text-[#879783]">
                        {item.fecha}
                      </p>

                    </Link>
                  ))}

                </div>
              ) : (
                <p className="px-5 py-7 text-sm text-[#aab6a5]">
                  No hay más noticias de esta categoría.
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