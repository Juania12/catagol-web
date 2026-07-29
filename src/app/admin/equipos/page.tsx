import Image from "next/image";
import Link from "next/link";

import AdminHeader from "../../components/admin/AdminHeader";
import AdminNotice from "../../components/admin/AdminNotice";
import AdminStat from "../../components/admin/AdminStat";

import { equipos } from "../../data/equipos";

export default function AdminEquiposPage() {
  const listaEquipos = Object.values(equipos).sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  const ligasRegistradas = new Set(
    listaEquipos.map((equipo) => equipo.liga)
  ).size;

  return (
    <main className="min-h-screen bg-[#09110c] text-[#F5F1E8]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">

        <AdminHeader
          etiqueta="Gestión institucional"
          titulo="Equipos"
          descripcion="Administrá los clubes, sus datos institucionales y los escudos utilizados en CATAGOL."
          accionHref="/admin/equipos/nuevo"
          accionTexto="+ Nuevo equipo"
        />

        {/* RESUMEN */}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <AdminStat
            etiqueta="Equipos"
            valor={listaEquipos.length}
            descripcion="clubes registrados"
          />

          <AdminStat
            etiqueta="Ligas"
            valor={ligasRegistradas}
            descripcion="competencias representadas"
          />

          <AdminStat
            etiqueta="Estado"
            valor="Activo"
            descripcion="módulo local"
            destacado={false}
          />
        </section>

        {/* BUSCADOR VISUAL */}

        <section className="mt-8 rounded-3xl border border-[#33462b] bg-[#142318] p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="search"
              placeholder="Buscar equipo..."
              className="rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none placeholder:text-[#5f6d5c] focus:border-[#D6B46A]"
            />

            <select className="rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none focus:border-[#D6B46A]">
              <option>Todas las ligas</option>
              <option>Liga Catamarqueña</option>
              <option>Liga Chacarera</option>
            </select>
          </div>

          <p className="mt-3 text-xs text-[#879783]">
            Los filtros empezarán a funcionar cuando conectemos la pantalla con
            estado y base de datos.
          </p>
        </section>

        {/* GALERÍA DE EQUIPOS */}

        <section className="mt-8">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
              Clubes registrados
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Listado de equipos
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listaEquipos.map((equipo) => {
              const nombreLiga =
                equipo.liga === "Chacarera"
                  ? "Liga Chacarera"
                  : equipo.liga === "Regional Amateur"
                    ? "Regional Amateur"
                    : "Liga Catamarqueña";

              return (
                <article
                  key={equipo.slug}
                  className="group overflow-hidden rounded-3xl border border-[#33462b] bg-[#142318] shadow-xl transition hover:-translate-y-1 hover:border-[#D6B46A]/60"
                >
                  <div className="relative flex min-h-52 items-center justify-center border-b border-[#33462b] bg-gradient-to-br from-[#1a2d1e] via-[#101d14] to-[#241914] p-6">
                    <Image
                      src={equipo.escudo}
                      alt={equipo.nombre}
                      width={120}
                      height={120}
                      className="h-28 w-28 object-contain drop-shadow-2xl transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-black uppercase tracking-wide text-[#D6B46A]">
                      {nombreLiga}
                    </p>

                    <h3 className="mt-3 text-xl font-black">
                      {equipo.nombre}
                    </h3>

                    <div className="mt-4 space-y-2 text-sm text-[#aab6a5]">
                      <p>
                        <span className="font-bold text-[#c7d0c2]">
                          Ciudad:
                        </span>{" "}
                        {equipo.ciudad}
                      </p>

                      <p>
                        <span className="font-bold text-[#c7d0c2]">
                          Categoría:
                        </span>{" "}
                        {equipo.categoria}
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Link
                        href={`/equipos/${equipo.slug}`}
                        className="rounded-xl border border-[#4f673c] px-3 py-2 text-center text-sm font-black text-[#c7d0c2] transition hover:bg-[#1a2d1e]"
                      >
                        Ver club
                      </Link>

                      <Link
                        href={`/admin/equipos/${equipo.slug}/editar`}
                        className="rounded-xl border border-[#D6B46A]/60 px-3 py-2 text-center text-sm font-black text-[#D6B46A] transition hover:bg-[#D6B46A]/10"
                      >
                        Editar
                      </Link>
                    </div>

                    <button
                      type="button"
                      className="mt-3 w-full rounded-xl border border-red-500/40 px-3 py-2 text-sm font-black text-red-300 transition hover:bg-red-500/10"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <AdminNotice>
          Los botones Nuevo equipo, Editar y Eliminar todavía no modificarán
          datos. Los conectaremos a Supabase más adelante.
        </AdminNotice>

      </div>
    </main>
  );
}