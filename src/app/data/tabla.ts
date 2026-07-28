import { partidos } from "./partidos";


const equiposBase = [
  "Villa Cubas",
  "Policial",
  "San Lorenzo",
  "Tesorieri",
  "Obreros",
  "Social Rojas",
  "Coronel Daza",
  "Defensores",
  "Independiente",
];


const posiciones = equiposBase.map((nombre) => ({
  equipo: nombre,
  pj: 0,
  pg: 0,
  pe: 0,
  pp: 0,
  gf: 0,
  gc: 0,
  dg: 0,
  pts: 0,
}));


partidos.forEach((partido) => {

  const local = posiciones.find(
    (equipo) => equipo.equipo === partido.local
  );

  const visitante = posiciones.find(
    (equipo) => equipo.equipo === partido.visitante
  );


  if (!local || !visitante) return;


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


posiciones.forEach((equipo) => {

  equipo.dg = equipo.gf - equipo.gc;

});


export const tabla = posiciones
  .sort((a, b) => {

    if (b.pts !== a.pts)
      return b.pts - a.pts;

    return b.dg - a.dg;

  })
  .map((equipo, index) => ({

    posicion: index + 1,
    ...equipo,

  }));