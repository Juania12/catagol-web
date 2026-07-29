import Link from "next/link";

import AdminHeader from "../../components/admin/AdminHeader";
import AdminNotice from "../../components/admin/AdminNotice";
import AdminPageLayout from "../../components/admin/AdminPageLayout";
import AdminSection from "../../components/admin/AdminSection";
import AdminStat from "../../components/admin/AdminStat";
import StatusBadge from "../../components/admin/StatusBadge";

import { partidos } from "../../data/partidos";
import { proximos } from "../../data/proximos";

export default function AdminPartidosPage() {
  const ligasRegistradas = new Set([
    ...partidos.map((partido) => partido.liga),
    ...proximos.map((partido) => partido.liga),
  ]).size;

  return (
    <AdminPageLayout>
      <AdminHeader
        etiqueta="Gestión deportiva"
        titulo="Partidos"
        descripcion="Administrá los resultados cargados y los próximos encuentros de CATAGOL."
        accionHref="/admin/partidos/nuevo"
        accionTexto="+ Nuevo partido"
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStat
          etiqueta="Finalizados"
          valor={partidos.length}
          descripcion="resultados cargados"
        />

        <AdminStat
          etiqueta="Programados"
          valor={proximos.length}
          descripcion="próximos partidos"
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

      <section className="mt-8 rounded-3xl border border-[#33462b] bg-[#142318] p-5 md:p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <input
            type="search"
            placeholder="Buscar partido..."
            className="rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none placeholder:text-[#5f6d5c] focus:border-[#D6B46A]"
          />

          <select className="rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none focus:border-[#D6B46A]">
            <option>Todas las ligas</option>
            <option>Liga Catamarqueña</option>
            <option>Liga Chacarera</option>
          </select>

          <select className="rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none focus:border-[#D6B46A]">
            <option>Todos los estados</option>
            <option>Finalizados</option>
            <option>Programados</option>
          </select>
        </div>

        <p className="mt-3 text-xs text-[#879783]">
          Los filtros empezarán a funcionar cuando conectemos la pantalla con
          estado y base de datos.
        </p>
      </section>

      <AdminSection
        etiqueta="Partidos finalizados"
        titulo="Resultados cargados"
      >
        {partidos.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {partidos.map((partido) => (
              <article
                key={partido.id}
                className="rounded-3xl border border-[#33462b] bg-[#142318] p-6 shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <StatusBadge status="final" />

                  <span className="text-sm font-bold text-[#879783]">
                    {partido.liga}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-5">
                  <div className="min-w-0">
                    <p className="truncate font-black">
                      {partido.local}
                    </p>

                    <p className="mt-4 truncate font-black">
                      {partido.visitante}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-black text-[#D6B46A]">
                      {partido.golesLocal}
                    </p>

                    <p className="mt-4 text-3xl font-black text-[#D6B46A]">
                      {partido.golesVisitante}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#33462b] pt-4 text-sm text-[#879783]">
                  <p>{partido.fecha}</p>
                  <p className="mt-1">{partido.estadio}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/admin/partidos/${partido.id}/editar`}
                    className="rounded-xl border border-[#D6B46A]/60 px-4 py-2 text-sm font-black text-[#D6B46A] transition hover:bg-[#D6B46A]/10"
                  >
                    Editar
                  </Link>

                  <Link
                    href={`/partidos/${partido.id}`}
                    className="rounded-xl border border-[#4f673c] px-4 py-2 text-sm font-black text-[#c7d0c2] transition hover:bg-[#1a2d1e]"
                  >
                    Match Center
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
          <p className="rounded-3xl border border-[#33462b] bg-[#142318] p-6 text-[#aab6a5]">
            Todavía no hay resultados cargados.
          </p>
        )}
      </AdminSection>

      <AdminSection
        etiqueta="Agenda"
        titulo="Próximos partidos"
      >
        {proximos.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {proximos.map((partido, index) => (
              <article
                key={`${partido.local}-${partido.visitante}-${index}`}
                className="rounded-3xl border border-[#33462b] bg-[#142318] p-6 shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <StatusBadge status="programado" />

                  <span className="text-sm font-bold text-[#879783]">
                    {partido.liga}
                  </span>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xl font-black">
                    {partido.local}
                  </p>

                  <p className="my-4 text-2xl font-black text-[#D6B46A]">
                    VS
                  </p>

                  <p className="text-xl font-black">
                    {partido.visitante}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#33462b] pt-4 text-center text-sm text-[#879783]">
                  <p>
                    {partido.fecha} · {partido.hora}
                  </p>

                  <p className="mt-1">
                    {partido.estadio}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    className="rounded-xl border border-[#D6B46A]/60 px-4 py-2 text-sm font-black text-[#D6B46A] transition hover:bg-[#D6B46A]/10"
                  >
                    Editar
                  </button>

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
          <p className="rounded-3xl border border-[#33462b] bg-[#142318] p-6 text-[#aab6a5]">
            No hay próximos partidos cargados.
          </p>
        )}
      </AdminSection>

      <AdminNotice>
        Los filtros y los botones Editar y Eliminar todavía no modificarán
        datos. Los conectaremos a Supabase más adelante.
      </AdminNotice>
    </AdminPageLayout>
  );
}