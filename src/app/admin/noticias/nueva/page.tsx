import Link from "next/link";

import { competiciones } from "../../../data/competiciones";
import { equipos } from "../../../data/equipos";

export default function NuevaNoticiaPage() {
  const listaCompeticiones = Object.values(competiciones);

  const listaEquipos = Object.values(equipos).sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  return (
    <main className="min-h-screen bg-[#09110c] text-[#F5F1E8]">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">
        <Link
          href="/admin/noticias"
          className="text-sm font-black text-[#D6B46A] transition hover:text-[#ead292]"
        >
          ← Volver a Noticias
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl border border-[#33462b] bg-[#142318] shadow-2xl">
          <div className="border-b border-[#33462b] px-6 py-6 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
              Gestión de contenido
            </p>

            <h1 className="mt-2 text-3xl font-black md:text-4xl">
              Nueva noticia
            </h1>

            <p className="mt-3 max-w-2xl text-[#aab6a5]">
              Completá la información de la publicación. En esta etapa el
              formulario todavía no guarda datos.
            </p>
          </div>

          <form className="space-y-8 p-6 md:p-8">
            {/* INFORMACIÓN PRINCIPAL */}

            <section>
              <h2 className="text-lg font-black">
                Información principal
              </h2>

              <div className="mt-4 space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Título
                  </span>

                  <input
                    type="text"
                    placeholder="Villa Cubas ganó el clásico"
                    className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition placeholder:text-[#5f6d5c] focus:border-[#D6B46A]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Descripción breve
                  </span>

                  <textarea
                    rows={3}
                    placeholder="Escribí una bajada breve para la portada."
                    className="mt-2 w-full resize-y rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition placeholder:text-[#5f6d5c] focus:border-[#D6B46A]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Contenido completo
                  </span>

                  <textarea
                    rows={10}
                    placeholder="Escribí el desarrollo completo de la noticia."
                    className="mt-2 w-full resize-y rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition placeholder:text-[#5f6d5c] focus:border-[#D6B46A]"
                  />
                </label>
              </div>
            </section>

            {/* CLASIFICACIÓN */}

            <section>
              <h2 className="text-lg font-black">
                Clasificación
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Liga
                  </span>

                  <select className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition focus:border-[#D6B46A]">
                    <option value="">
                      Seleccionar liga
                    </option>

                    {listaCompeticiones.map((competencia) => (
                      <option
                        key={competencia.slug}
                        value={competencia.nombre}
                      >
                        {competencia.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Fecha visible
                  </span>

                  <input
                    type="text"
                    placeholder="Hace 2 horas"
                    className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition placeholder:text-[#5f6d5c] focus:border-[#D6B46A]"
                  />
                </label>
              </div>
            </section>

            {/* IMAGEN */}

            <section>
              <h2 className="text-lg font-black">
                Imagen principal
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Ruta de la imagen
                  </span>

                  <input
                    type="text"
                    placeholder="/noticias/clasico.jpg"
                    className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition placeholder:text-[#5f6d5c] focus:border-[#D6B46A]"
                  />

                  <p className="mt-2 text-xs leading-5 text-[#879783]">
                    Por ahora, la imagen debe existir dentro de
                    {" "}
                    <code className="text-[#D6B46A]">
                      public/noticias
                    </code>.
                  </p>
                </label>

                <div className="rounded-2xl border border-dashed border-[#4f673c] bg-[#101d14] p-5">
                  <p className="text-sm font-black text-[#D6B46A]">
                    Carga de archivos
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#879783]">
                    La subida directa de imágenes se habilitará cuando
                    conectemos el almacenamiento de Supabase.
                  </p>
                </div>
              </div>
            </section>

            {/* EQUIPOS RELACIONADOS */}

            <section>
              <h2 className="text-lg font-black">
                Equipos relacionados
              </h2>

              <p className="mt-2 text-sm text-[#879783]">
                Seleccioná los clubes protagonistas de la noticia.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {listaEquipos.map((equipo) => (
                  <label
                    key={equipo.slug}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#33462b] bg-[#101d14] p-4 transition hover:border-[#D6B46A]/60"
                  >
                    <input
                      type="checkbox"
                      value={equipo.nombreCorto}
                      className="h-4 w-4 accent-[#D6B46A]"
                    />

                    <span className="text-sm font-bold">
                      {equipo.nombre}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* ACCIONES */}

            <div className="flex flex-col-reverse gap-3 border-t border-[#33462b] pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/admin/noticias"
                className="rounded-xl border border-[#4f673c] px-5 py-3 text-center font-black text-[#c7d0c2] transition hover:bg-[#1a2d1e]"
              >
                Cancelar
              </Link>

              <button
                type="button"
                className="rounded-xl bg-[#D6B46A] px-5 py-3 font-black text-[#142318] transition hover:bg-[#ead292]"
              >
                Publicar noticia
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}