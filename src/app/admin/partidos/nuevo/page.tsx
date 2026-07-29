import Link from "next/link";

import { equipos } from "../../../data/equipos";
import { competiciones } from "../../../data/competiciones";

export default function NuevoResultadoPage() {
  const listaEquipos = Object.values(equipos).sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  const listaCompeticiones = Object.values(competiciones);

  return (
    <main className="min-h-screen bg-[#09110c] text-[#F5F1E8]">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">

        <Link
          href="/admin"
          className="text-sm font-black text-[#D6B46A] transition hover:text-[#ead292]"
        >
          ← Volver al panel
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl border border-[#33462b] bg-[#142318] shadow-2xl">

          <div className="border-b border-[#33462b] px-6 py-6 md:px-8">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
              Partidos
            </p>

            <h1 className="mt-2 text-3xl font-black md:text-4xl">
              Cargar resultado
            </h1>

            <p className="mt-3 text-[#aab6a5]">
              Completá los datos del encuentro. En esta etapa el formulario es
              visual y todavía no guarda cambios.
            </p>

          </div>

          <form className="space-y-8 p-6 md:p-8">

            {/* COMPETENCIA */}

            <section>
              <h2 className="text-lg font-black">
                Competencia
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
                        value={competencia.slug}
                      >
                        {competencia.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Categoría
                  </span>

                  <select className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition focus:border-[#D6B46A]">
                    <option value="">
                      Seleccionar categoría
                    </option>

                    <option value="Primera A">
                      Primera A
                    </option>

                    <option value="Primera B">
                      Primera B
                    </option>
                  </select>
                </label>

              </div>
            </section>

            {/* EQUIPOS */}

            <section>
              <h2 className="text-lg font-black">
                Equipos
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">

                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Equipo local
                  </span>

                  <select className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition focus:border-[#D6B46A]">
                    <option value="">
                      Seleccionar equipo
                    </option>

                    {listaEquipos.map((equipo) => (
                      <option
                        key={equipo.slug}
                        value={equipo.nombreCorto}
                      >
                        {equipo.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Equipo visitante
                  </span>

                  <select className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition focus:border-[#D6B46A]">
                    <option value="">
                      Seleccionar equipo
                    </option>

                    {listaEquipos.map((equipo) => (
                      <option
                        key={equipo.slug}
                        value={equipo.nombreCorto}
                      >
                        {equipo.nombre}
                      </option>
                    ))}
                  </select>
                </label>

              </div>
            </section>

            {/* RESULTADO */}

            <section>
              <h2 className="text-lg font-black">
                Resultado final
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-4">

                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Goles local
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition focus:border-[#D6B46A]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Goles visitante
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition focus:border-[#D6B46A]"
                  />
                </label>

              </div>
            </section>

            {/* INFORMACIÓN */}

            <section>
              <h2 className="text-lg font-black">
                Información del encuentro
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">

                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Fecha
                  </span>

                  <input
                    type="text"
                    placeholder="Fecha 1"
                    className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition focus:border-[#D6B46A]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[#c7d0c2]">
                    Estadio
                  </span>

                  <input
                    type="text"
                    placeholder="Estadio Bicentenario"
                    className="mt-2 w-full rounded-xl border border-[#4f673c] bg-[#101d14] px-4 py-3 text-[#F5F1E8] outline-none transition focus:border-[#D6B46A]"
                  />
                </label>

              </div>
            </section>

            {/* ACCIONES */}

            <div className="flex flex-col-reverse gap-3 border-t border-[#33462b] pt-6 sm:flex-row sm:justify-end">

              <Link
                href="/admin"
                className="rounded-xl border border-[#4f673c] px-5 py-3 text-center font-black text-[#c7d0c2] transition hover:bg-[#1a2d1e]"
              >
                Cancelar
              </Link>

              <button
                type="button"
                className="rounded-xl bg-[#D6B46A] px-5 py-3 font-black text-[#142318] transition hover:bg-[#ead292]"
              >
                Guardar resultado
              </button>

            </div>

          </form>

        </section>

      </div>
    </main>
  );
}