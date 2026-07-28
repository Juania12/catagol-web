import { equipos } from "../data/equipos";

export function obtenerEquipos() {
  return Object.values(equipos);
}

export function obtenerEquipoPorNombre(nombre: string) {
  return equipos[nombre as keyof typeof equipos];
}

export function obtenerEquipoPorSlug(slug: string) {
  return Object.values(equipos).find(
    (equipo) => equipo.slug === slug
  );
}

export function obtenerEquiposPorLiga(liga: string) {
  return Object.values(equipos).filter(
    (equipo) => equipo.liga === liga
  );
}