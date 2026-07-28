import { partidos } from "../data/partidos";

export function obtenerPartidosEquipo(nombreEquipo: string) {
  return partidos.filter(
    (partido) =>
      partido.local === nombreEquipo ||
      partido.visitante === nombreEquipo
  );
}

export function obtenerFormaEquipo(nombreEquipo: string) {
  const ultimos = obtenerPartidosEquipo(nombreEquipo).slice(-5);

  return ultimos.map((partido) => {
    if (partido.local === nombreEquipo) {
      if (partido.golesLocal > partido.golesVisitante) return "G";
      if (partido.golesLocal < partido.golesVisitante) return "P";
      return "E";
    }

    if (partido.golesVisitante > partido.golesLocal) return "G";
    if (partido.golesVisitante < partido.golesLocal) return "P";
    return "E";
  });
}