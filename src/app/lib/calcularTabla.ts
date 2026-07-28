import { partidos } from "../data/partidos";

export function calcularTabla(liga?: string) {
  const tabla: Record<
    string,
    {
      equipo: string;
      pj: number;
      pg: number;
      pe: number;
      pp: number;
      gf: number;
      gc: number;
      dg: number;
      pts: number;
    }
  > = {};

  partidos
    .filter((partido) => !liga || partido.liga === liga)
    .forEach((partido) => {
      if (!tabla[partido.local]) {
        tabla[partido.local] = {
          equipo: partido.local,
          pj: 0,
          pg: 0,
          pe: 0,
          pp: 0,
          gf: 0,
          gc: 0,
          dg: 0,
          pts: 0,
        };
      }

      if (!tabla[partido.visitante]) {
        tabla[partido.visitante] = {
          equipo: partido.visitante,
          pj: 0,
          pg: 0,
          pe: 0,
          pp: 0,
          gf: 0,
          gc: 0,
          dg: 0,
          pts: 0,
        };
      }

      const local = tabla[partido.local];
      const visitante = tabla[partido.visitante];

      local.pj++;
      visitante.pj++;

      local.gf += partido.golesLocal;
      local.gc += partido.golesVisitante;

      visitante.gf += partido.golesVisitante;
      visitante.gc += partido.golesLocal;

      if (partido.golesLocal > partido.golesVisitante) {
        local.pg++;
        visitante.pp++;
        local.pts += 3;
      } else if (partido.golesLocal < partido.golesVisitante) {
        visitante.pg++;
        local.pp++;
        visitante.pts += 3;
      } else {
        local.pe++;
        visitante.pe++;
        local.pts++;
        visitante.pts++;
      }
    });

  return Object.values(tabla)
    .map((equipo) => ({
      ...equipo,
      dg: equipo.gf - equipo.gc,
    }))
    .sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.dg !== a.dg) return b.dg - a.dg;
      return b.gf - a.gf;
    })
    .map((equipo, index) => ({
      posicion: index + 1,
      ...equipo,
    }));
}

export function obtenerEstadisticasEquipo(nombreEquipo: string) {
  const tabla = calcularTabla();

  return tabla.find((equipo) => equipo.equipo === nombreEquipo);
}
