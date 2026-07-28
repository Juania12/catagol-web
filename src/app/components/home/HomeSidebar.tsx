import Image from "next/image";
import Link from "next/link";

import { calcularTabla } from "../../lib/calcularTabla";
import { obtenerEquipoPorNombre } from "../../lib/obtenerEquipos";
import { proximos } from "../../data/proximos";

import Badge from "../ui/Badge";

export default function HomeSidebar() {
  const ligaSeleccionada = "Catamarqueña";

  const tabla = calcularTabla(ligaSeleccionada).slice(0, 5);

  const proximosPartidos = proximos
    .filter((partido) => partido.liga === ligaSeleccionada)
    .slice(0, 3);

  return (
    <div className="space-y-6">

      {/* TABLA DE POSICIONES */}

      <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

        <div className="flex items-center justify-between border-b border-[#4f673c] px-5 py-5">

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
              Liga Catamarqueña
            </p>

            <h2 className="mt-2 text-xl font-black text-[#F5F1E8]">
              Tabla de posiciones
            </h2>
          </div>

          <Badge variant="catamarquena">
            Primera A
          </Badge>

        </div>

        {tabla.length > 0 ? (
          <div className="divide-y divide-[#33462b]">

            {tabla.map((fila, index) => {
              const equipo = obtenerEquipoPorNombre(fila.equipo);
              const esLider = index === 0;

              return (
                <div
                  key={fila.equipo}
                  className={`relative grid grid-cols-[28px_1fr_auto] items-center gap-3 px-5 py-4 ${
                    esLider
                      ? "bg-[#1d3422]"
                      : "transition hover:bg-[#1a2d1e]"
                  }`}
                >

                  {esLider && (
                    <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#D6B46A]" />
                  )}

                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                      esLider
                        ? "bg-[#D6B46A] text-[#142318]"
                        : "bg-[#263a29] text-[#aab6a5]"
                    }`}
                  >
                    {fila.posicion}
                  </div>

                  <div className="flex min-w-0 items-center gap-3">

                    {equipo ? (
                      <Image
                        src={equipo.escudo}
                        alt={equipo.nombre}
                        width={34}
                        height={34}
                        className="h-8 w-8 shrink-0 object-contain"
                      />
                    ) : (
                      <div className="h-8 w-8 shrink-0 rounded-full bg-[#263a29]" />
                    )}

                    <div className="min-w-0">

                      <p className="truncate text-sm font-black text-[#F5F1E8]">
                        {equipo?.nombreCorto ?? fila.equipo}
                      </p>

                      <p className="mt-1 text-[11px] text-[#879783]">
                        {fila.pj} PJ · DG {fila.dg > 0 ? `+${fila.dg}` : fila.dg}
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-lg font-black text-[#D6B46A]">
                      {fila.pts}
                    </p>

                    <p className="text-[10px] font-bold uppercase text-[#879783]">
                      Pts
                    </p>

                  </div>

                </div>
              );
            })}

          </div>
        ) : (
          <p className="px-5 py-6 text-sm text-[#aab6a5]">
            Todavía no hay datos suficientes para calcular la tabla.
          </p>
        )}

        <Link
          href="/ligas/catamarquena"
          className="block border-t border-[#4f673c] px-5 py-4 text-center text-sm font-black text-[#D6B46A] transition hover:bg-[#1b3020] hover:text-[#ead292]"
        >
          Ver tabla completa →
        </Link>

      </section>

      {/* PRÓXIMOS PARTIDOS */}

      <section className="overflow-hidden rounded-3xl border border-[#4f673c] bg-[#142318] shadow-2xl">

        <div className="border-b border-[#4f673c] px-5 py-5">

          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
            Agenda
          </p>

          <h2 className="mt-2 text-xl font-black text-[#F5F1E8]">
            Próximos partidos
          </h2>

        </div>

        {proximosPartidos.length > 0 ? (
          <div className="divide-y divide-[#33462b]">

            {proximosPartidos.map((partido, index) => {
              const local = obtenerEquipoPorNombre(partido.local);
              const visitante = obtenerEquipoPorNombre(partido.visitante);

              return (
                <div
                  key={`${partido.local}-${partido.visitante}-${index}`}
                  className="px-5 py-5 transition hover:bg-[#1a2d1e]"
                >

                  <div className="mb-4 flex items-center justify-between gap-3">

                    <Badge variant="upcoming">
                      Próximo
                    </Badge>

                    <span className="text-xs font-bold text-[#aab6a5]">
                      {partido.fecha}
                    </span>

                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">

                    <div className="flex min-w-0 flex-col items-center">

                      {local && (
                        <Image
                          src={local.escudo}
                          alt={local.nombre}
                          width={42}
                          height={42}
                          className="h-10 w-10 object-contain"
                        />
                      )}

                      <p className="mt-2 max-w-full truncate text-center text-xs font-black text-[#F5F1E8]">
                        {local?.nombreCorto ?? partido.local}
                      </p>

                    </div>

                    <div className="text-center">

                      <p className="text-sm font-black text-[#D6B46A]">
                        {partido.hora}
                      </p>

                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#879783]">
                        VS
                      </p>

                    </div>

                    <div className="flex min-w-0 flex-col items-center">

                      {visitante && (
                        <Image
                          src={visitante.escudo}
                          alt={visitante.nombre}
                          width={42}
                          height={42}
                          className="h-10 w-10 object-contain"
                        />
                      )}

                      <p className="mt-2 max-w-full truncate text-center text-xs font-black text-[#F5F1E8]">
                        {visitante?.nombreCorto ?? partido.visitante}
                      </p>

                    </div>

                  </div>

                  <p className="mt-4 truncate text-center text-xs text-[#879783]">
                    {partido.estadio}
                  </p>

                </div>
              );
            })}

          </div>
        ) : (
          <p className="px-5 py-6 text-sm text-[#aab6a5]">
            No hay próximos partidos cargados.
          </p>
        )}

        <Link
          href="/fixture"
          className="block border-t border-[#4f673c] px-5 py-4 text-center text-sm font-black text-[#D6B46A] transition hover:bg-[#1b3020] hover:text-[#ead292]"
        >
          Ver fixture completo →
        </Link>

      </section>

      {/* ACCESOS RÁPIDOS */}

      <section className="rounded-3xl border border-[#4f673c] bg-[#142318] p-5 shadow-2xl">

        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
          Explorar CATAGOL
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">

          <Link
            href="/equipos"
            className="rounded-xl border border-[#4f673c] bg-[#1a2d1e] px-3 py-4 text-center text-sm font-black text-[#F5F1E8] transition hover:border-[#D6B46A] hover:text-[#D6B46A]"
          >
            Equipos
          </Link>

          <Link
            href="/fixture"
            className="rounded-xl border border-[#4f673c] bg-[#1a2d1e] px-3 py-4 text-center text-sm font-black text-[#F5F1E8] transition hover:border-[#D6B46A] hover:text-[#D6B46A]"
          >
            Fixture
          </Link>

        </div>

      </section>

    </div>
  );
}