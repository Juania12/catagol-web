import { obtenerPartidosEquipo } from "./obtenerPartidosEquipo";

export type EstadoForma = {
  invicto: number;
  victoriasUltimos5: number;
  golesFavor: number;
  golesContra: number;
  mensaje: string;
};

export function obtenerEstadoForma(
  nombreEquipo: string
): EstadoForma {
  const partidos = obtenerPartidosEquipo(nombreEquipo)
    .slice(-5)
    .reverse();

  let invicto = 0;
  let victorias = 0;
  let gf = 0;
  let gc = 0;

  for (const partido of partidos) {
    const esLocal = partido.local === nombreEquipo;

    const golesFavor = esLocal
      ? partido.golesLocal
      : partido.golesVisitante;

    const golesContra = esLocal
      ? partido.golesVisitante
      : partido.golesLocal;

    gf += golesFavor;
    gc += golesContra;

    if (golesFavor > golesContra) {
      victorias++;
      invicto++;
    } else if (golesFavor === golesContra) {
      invicto++;
    } else {
      break;
    }
  }

  let mensaje = "El equipo busca recuperar regularidad.";

  if (invicto >= 5) {
    mensaje = "Gran presente: lleva cinco partidos sin perder.";
  } else if (invicto >= 3) {
    mensaje = "Buen momento: mantiene una racha positiva.";
  } else if (victorias >= 3) {
    mensaje = "El equipo llega con varias victorias recientes.";
  }

  return {
    invicto,
    victoriasUltimos5: victorias,
    golesFavor: gf,
    golesContra: gc,
    mensaje,
  };
}