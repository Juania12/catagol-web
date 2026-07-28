import { partidos } from "../data/partidos";

export function obtenerPartidos() {
  return partidos;
}

export function obtenerPartidosPorLiga(liga: string) {
  return partidos.filter(
    (partido) => partido.liga === liga
  );
}

export function obtenerPartidosPorEquipo(equipo: string) {
  return partidos.filter(
    (partido) =>
      partido.local === equipo ||
      partido.visitante === equipo
  );
}

export function obtenerUltimosPartidos(
  liga: string,
  cantidad = 5
) {
  return obtenerPartidosPorLiga(liga).slice(0, cantidad);
}