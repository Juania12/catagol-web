import { Incidencia } from "../../data/incidencias";

type Props = {
  incidencias: Incidencia[];
};

function obtenerIcono(tipo: Incidencia["tipo"]) {
  switch (tipo) {
    case "gol":
      return "⚽";
    case "amarilla":
      return "🟨";
    case "roja":
      return "🟥";
    case "cambio":
      return "↔";
    case "inicio":
      return "▶";
    case "entretiempo":
      return "⏸";
    case "final":
      return "■";
    default:
      return "•";
  }
}

export default function MatchTimeline({
  incidencias,
}: Props) {
  if (incidencias.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#4f673c] bg-[#101d14] p-6 text-center">
        <p className="font-bold text-[#F5F1E8]">
          Todavía no hay incidencias cargadas.
        </p>

        <p className="mt-2 text-sm text-[#879783]">
          Los goles, tarjetas y cambios aparecerán acá.
        </p>
      </div>
    );
  }

  return (
    <div className="relative mt-6">

      <div className="absolute bottom-3 left-[22px] top-3 w-px bg-[#4f673c]" />

      <div className="space-y-4">

        {incidencias.map((incidencia) => (
          <div
            key={incidencia.id}
            className="relative grid grid-cols-[46px_1fr] gap-4"
          >

            <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#4f673c] bg-[#1a2d1e] text-lg">
              {obtenerIcono(incidencia.tipo)}
            </div>

            <div className="rounded-2xl border border-[#33462b] bg-[#101d14] p-4">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <p className="font-black text-[#F5F1E8]">
                  {incidencia.detalle}
                </p>

                {incidencia.minuto !== null && (
                  <span className="rounded-full bg-[#D6B46A] px-3 py-1 text-xs font-black text-[#142318]">
                    {incidencia.minuto}&apos;
                  </span>
                )}

              </div>

              {incidencia.equipo && (
                <p className="mt-2 text-sm font-bold text-[#D6B46A]">
                  {incidencia.equipo}
                </p>
              )}

              {incidencia.jugador && (
                <p className="mt-1 text-sm text-[#aab6a5]">
                  {incidencia.jugador}
                </p>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}