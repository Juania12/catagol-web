import Image from "next/image";
import Link from "next/link";

import AdminHeader from "../../components/admin/AdminHeader";
import AdminNotice from "../../components/admin/AdminNotice";
import AdminStat from "../../components/admin/AdminStat";

import { noticias } from "../../data/noticias";

export default function AdminNoticiasPage() {
  const categorias = new Set(
    noticias.map((noticia) => noticia.categoria)
  ).size;

  return (
    <main className="min-h-screen bg-[#09110c] text-[#F5F1E8]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">

        <AdminHeader
          etiqueta="Gestión de contenido"
          titulo="Noticias"
          descripcion="Revisá las publicaciones actuales y prepará nuevas noticias para CATAGOL."
          accionHref="/admin/noticias/nueva"
          accionTexto="+ Nueva noticia"
        />

        {/* RESUMEN */}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <AdminStat
            etiqueta="Publicadas"
            valor={noticias.length}
            descripcion="noticias visibles"
          />

          <AdminStat
            etiqueta="Categorías"
            valor={categorias}
            descripcion="ligas representadas"
          />

          <AdminStat
            etiqueta="Estado"
            valor="Activo"
            descripcion="módulo local"
            destacado={false}
          />
        </section>

        {/* LISTADO */}

        <section className="mt-8 overflow-hidden rounded-3xl border border-[#33462b] bg-[#142318]">
          <div className="border-b border-[#33462b] px-6 py-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D6B46A]">
              Publicaciones
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Noticias cargadas
            </h2>
          </div>

          {noticias.length > 0 ? (
            <div className="divide-y divide-[#33462b]">
              {noticias.map((noticia) => (
                <article
                  key={noticia.id}
                  className="grid gap-5 px-5 py-5 md:grid-cols-[150px_1fr_auto] md:items-center md:px-6"
                >
                  <div className="relative h-28 overflow-hidden rounded-2xl">
                    <Image
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-wide text-[#D6B46A]">
                      {noticia.categoria}
                    </p>

                    <h3 className="mt-2 text-lg font-black">
                      {noticia.titulo}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#aab6a5]">
                      {noticia.descripcion}
                    </p>

                    <p className="mt-3 text-xs font-bold text-[#879783]">
                      {noticia.fecha}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 md:flex-col">
                    <Link
                      href={`/noticias/${noticia.id}`}
                      className="rounded-xl border border-[#4f673c] px-4 py-2 text-center text-sm font-black text-[#c7d0c2] transition hover:bg-[#1a2d1e]"
                    >
                      Ver
                    </Link>

                    <Link
                      href={`/admin/noticias/${noticia.id}/editar`}
                      className="rounded-xl border border-[#D6B46A]/60 px-4 py-2 text-center text-sm font-black text-[#D6B46A] transition hover:bg-[#D6B46A]/10"
                    >
                      Editar
                    </Link>

                    <button
                      type="button"
                      className="rounded-xl border border-red-500/40 px-4 py-2 text-sm font-black text-red-300 transition hover:bg-red-500/10"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="px-6 py-8 text-[#aab6a5]">
              Todavía no hay noticias cargadas.
            </p>
          )}
        </section>

        <AdminNotice>
          Los botones Editar y Eliminar todavía no modificarán datos. Los
          conectaremos a la base de datos en el próximo sprint.
        </AdminNotice>

      </div>
    </main>
  );
}