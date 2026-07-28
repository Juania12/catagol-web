export type Club = {
  nombre: string;
  nombreCorto: string;
  slug: string;

  liga: string;
  categoria: string;

  ciudad: string;
  departamento: string;

  fundacion: string;

  escudo: string;

  estadio?: string;
  capacidad?: number;
  presidente?: string;
  entrenador?: string;

  colores?: string[];
};