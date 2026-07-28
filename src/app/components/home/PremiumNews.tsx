import Image from "next/image";
import Link from "next/link";

import { noticias } from "../../data/noticias";
import Badge from "../ui/Badge";

export default function PremiumNews() {
  const principal = noticias[0];
  const secundarias = noticias.slice(1);

  return (
    <section className="mt-8">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
            CATAGOL Noticias
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#F5F1E8]">
            Últimas noticias
          </h2>
        </div>

        <Link
          href="/noticias"
          className="font-bold text-[#D6B46A] hover:text-[#ead292]"
        >
          Ver todas →
        </Link>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* NOTICIA PRINCIPAL */}

        <Link
          href={`/noticias/${principal.id}`}
          className="group overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl lg:col-span-2"
        >

          <div className="relative h-80 overflow-hidden">

            <Image
              src={principal.imagen}
              alt={principal.titulo}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#142318] via-transparent to-transparent" />

            <div className="absolute left-6 top-6">

              <Badge variant="catamarquena">
                {principal.categoria}
              </Badge>

            </div>

          </div>

          <div className="p-7">

            <p className="text-sm font-bold text-[#D6B46A]">
              {principal.fecha}
            </p>

            <h3 className="mt-3 text-3xl font-black text-[#F5F1E8]">
              {principal.titulo}
            </h3>

            <p className="mt-4 text-slate-300">
              {principal.descripcion}
            </p>

            <p className="mt-6 font-black text-[#D6B46A]">
              Leer nota →
            </p>

          </div>

        </Link>

        {/* NOTICIAS SECUNDARIAS */}

        <div className="space-y-6">

          {secundarias.map((noticia) => (

            <Link
              key={noticia.id}
              href={`/noticias/${noticia.id}`}
              className="group flex gap-4 overflow-hidden rounded-2xl border border-[#4f673c] bg-[#142318] p-4 transition hover:bg-[#1d3422]"
            >

              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl">

                <Image
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />

              </div>

              <div>

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

                <h4 className="mt-3 font-black text-[#F5F1E8]">
                  {noticia.titulo}
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  {noticia.fecha}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}