import Link from "next/link";

import { partidos } from "../data/partidos";
import { proximos } from "../data/proximos";
import { noticias } from "../data/noticias";
import { equipos } from "../data/equipos";

const accesos = [
  {
    titulo: "Cargar resultado",
    descripcion: "Registrar el resultado final de un partido.",
    href: "/admin/partidos/nuevo",
    icono: "⚽",
  },
  {
    titulo: "Programar partido",
    descripcion: "Agregar un próximo encuentro al fixture.",
    href: "/admin/proximos/nuevo",
    icono: "📅",
  },
  {
    titulo: "Publicar noticia",
    descripcion: "Crear una noticia para la portada de CATAGOL.",
    href: "/admin/noticias/nueva",
    icono: "📰",
  },
  {
    titulo: "Administrar equipos",
    descripcion: "Revisar los clubes registrados.",
    href: "/admin/equipos",
    icono: "🛡️",
  },
];

export default function AdminPage() {
  const cantidadEquipos = Object.values(equipos).length;

  return (
    <main className="min-h-screen bg-[#09110c] text-[#F5F1E8]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">

        {/* SIDEBAR */}

        <aside className="hidden w-72 shrink-0 border-r border-[#33462b] bg-[#0d1b12] p-6 lg:block">
          <Link href="/v2" className="block">
            <p className="text-2xl font-black text-[#D6B46A]">
              CATAGOL
            </p>

            <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#879783]">
              Panel de administración
            </p>
          </Link>

          <nav className="mt-10 space-y-2">
            <Link
              href="/admin"
              className="block rounded-xl bg-[#D6B46A] px-4 py-3 font-black text-[#142318]"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/partidos"
              className="block rounded-xl px-4 py-3 font-bold text-[#c7d0c2] transition hover:bg-[#1a2d1e]"
            >
              Partidos
            </Link>

            <Link
              href="/admin/noticias"
              className="block rounded-xl px-4 py-3 font-bold text-[#c7d0c2] transition hover:bg-[#1a2d1e]"
            >
              Noticias
            </Link>

            <Link
              href="/admin/equipos"
              className="block rounded-xl px-4 py-3 font-bold text-[#c7d0c2] transition hover:bg-[#1a2d1e]"
            >
              Equipos
            </Link>

            <Link
              href="/admin/ligas"
              className="block rounded-xl px-4 py-3 font-bold text-[#c7d0c2] transition hover:bg-[#1a2d1e]"
            >
              Ligas
            </Link>
          </nav>

          <div className="mt-10 rounded-2xl border border-[#33462b] bg-[#101d14] p-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#D6B46A]">
              Modo local
            </p>

            <p className="mt-2 text-sm leading-6 text-[#879783]">
              Los formularios todavía no guardan cambios. La base de datos se
              conectará en el próximo sprint.
            </p>
          </div>
        </aside>

        {/* CONTENIDO */}

        <div className="min-w-0 flex-1">
          <header className="border-b border-[#33462b] bg-[#0d1b12] px-4 py-5 md:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  CATAGOL Admin
                </p>

                <h1 className="mt-2 text-3xl font-black">
                  Panel de control
                </h1>
              </div>

              <Link
                href="/v2"
                className="text-sm font-black text-[#D6B46A] transition hover:text-[#ead292]"
              >
                Ver sitio público →
              </Link>
            </div>
          </header>

          <div className="p-4 md:p-8">

            {/* RESUMEN */}

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  etiqueta: "Resultados",
                  valor: partidos.length,
                  detalle: "partidos cargados",
                },
                {
                  etiqueta: "Agenda",
                  valor: proximos.length,
                  detalle: "próximos partidos",
                },
                {
                  etiqueta: "Noticias",
                  valor: noticias.length,
                  detalle: "noticias publicadas",
                },
                {
                  etiqueta: "Equipos",
                  valor: cantidadEquipos,
                  detalle: "clubes registrados",
                },
              ].map((item) => (
                <article
                  key={item.etiqueta}
                  className="rounded-3xl border border-[#33462b] bg-[#142318] p-6 shadow-xl"
                >
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#879783]">
                    {item.etiqueta}
                  </p>

                  <p className="mt-4 text-4xl font-black text-[#D6B46A]">
                    {item.valor}
                  </p>

                  <p className="mt-2 text-sm text-[#aab6a5]">
                    {item.detalle}
                  </p>
                </article>
              ))}
            </section>

            {/* ACCIONES RÁPIDAS */}

            <section className="mt-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
                  Gestión
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Acciones rápidas
                </h2>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {accesos.map((acceso) => (
                  <Link
                    key={acceso.href}
                    href={acceso.href}
                    className="group rounded-3xl border border-[#33462b] bg-[#142318] p-6 transition hover:-translate-y-1 hover:border-[#D6B46A]/60 hover:bg-[#1a2d1e]"
                  >
                    <span className="text-3xl">
                      {acceso.icono}
                    </span>

                    <h3 className="mt-5 text-lg font-black">
                      {acceso.titulo}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#879783]">
                      {acceso.descripcion}
                    </p>

                    <p className="mt-5 text-sm font-black text-[#D6B46A]">
                      Abrir →
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* ACTIVIDAD */}

            <section className="mt-8 grid gap-8 xl:grid-cols-2">

              <article className="overflow-hidden rounded-3xl border border-[#33462b] bg-[#142318]">
                <div className="border-b border-[#33462b] px-6 py-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D6B46A]">
                    Última actividad
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Resultados recientes
                  </h2>
                </div>

                <div className="divide-y divide-[#33462b]">
                  {partidos.slice(0, 5).map((partido) => (
                    <div
                      key={partido.id}
                      className="flex items-center justify-between gap-4 px-6 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                          {partido.local} vs {partido.visitante}
                        </p>

                        <p className="mt-1 text-xs text-[#879783]">
                          {partido.liga} · {partido.fecha}
                        </p>
                      </div>

                      <p className="shrink-0 text-xl font-black text-[#D6B46A]">
                        {partido.golesLocal} — {partido.golesVisitante}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="overflow-hidden rounded-3xl border border-[#33462b] bg-[#142318]">
                <div className="border-b border-[#33462b] px-6 py-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D6B46A]">
                    Publicaciones
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Noticias recientes
                  </h2>
                </div>

                <div className="divide-y divide-[#33462b]">
                  {noticias.slice(0, 5).map((noticia) => (
                    <div
                      key={noticia.id}
                      className="px-6 py-4"
                    >
                      <p className="text-sm font-black">
                        {noticia.titulo}
                      </p>

                      <p className="mt-1 text-xs text-[#879783]">
                        {noticia.categoria} · {noticia.fecha}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

            </section>

          </div>
        </div>
      </div>
    </main>
  );
}