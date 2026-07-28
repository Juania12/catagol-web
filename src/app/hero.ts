export type HeroConfig =
  | {
      tipo: "partido";
      partidoId: string;
    }
  | {
      tipo: "noticia";
      titulo: string;
      descripcion: string;
      imagen: string;
      enlace: string;
    }
  | {
      tipo: "institucional";
      titulo: string;
      descripcion: string;
      imagen?: string;
      enlace?: string;
    };

export const heroPrincipal: HeroConfig = {
  tipo: "partido",
  partidoId: "villa-cubas-vs-policial",
};