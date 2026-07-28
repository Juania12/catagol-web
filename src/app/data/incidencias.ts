export type TipoIncidencia =
  | "gol"
  | "amarilla"
  | "roja"
  | "cambio"
  | "inicio"
  | "entretiempo"
  | "final";

export type Incidencia = {
  id: string;
  minuto: number | null;
  tipo: TipoIncidencia;
  equipo?: string;
  jugador?: string;
  detalle: string;
};

export type IncidenciasPartido = {
  partidoId: string;
  eventos: Incidencia[];
};

export const incidenciasPartidos: IncidenciasPartido[] = [
  {
    partidoId: "villa-cubas-vs-policial",
    eventos: [
      {
        id: "inicio-villa-policial",
        minuto: 0,
        tipo: "inicio",
        detalle: "Comenzó el partido.",
      },
      {
        id: "gol-villa-1",
        minuto: 18,
        tipo: "gol",
        equipo: "Villa Cubas",
        detalle: "Gol de Villa Cubas.",
      },
      {
        id: "entretiempo-villa-policial",
        minuto: 45,
        tipo: "entretiempo",
        detalle: "Final del primer tiempo.",
      },
      {
        id: "gol-policial-1",
        minuto: 61,
        tipo: "gol",
        equipo: "Policial",
        detalle: "Gol de Policial.",
      },
      {
        id: "gol-villa-2",
        minuto: 79,
        tipo: "gol",
        equipo: "Villa Cubas",
        detalle: "Gol de Villa Cubas.",
      },
      {
        id: "final-villa-policial",
        minuto: 90,
        tipo: "final",
        detalle: "Final del partido.",
      },
    ],
  },
];

export function obtenerIncidenciasPartido(partidoId: string) {
  return (
    incidenciasPartidos.find(
      (partido) => partido.partidoId === partidoId
    )?.eventos ?? []
  );
}