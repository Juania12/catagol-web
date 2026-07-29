type Status =
  | "final"
  | "programado"
  | "en-vivo"
  | "suspendido"
  | "postergado";

type Props = {
  status: Status;
};

const estilos: Record<
  Status,
  {
    texto: string;
    clases: string;
  }
> = {
  final: {
    texto: "FINAL",
    clases:
      "border-green-500/40 bg-green-500/15 text-green-300",
  },
  programado: {
    texto: "PROGRAMADO",
    clases:
      "border-yellow-500/40 bg-yellow-500/15 text-yellow-300",
  },
  "en-vivo": {
    texto: "EN VIVO",
    clases:
      "border-blue-500/40 bg-blue-500/15 text-blue-300",
  },
  suspendido: {
    texto: "SUSPENDIDO",
    clases:
      "border-red-500/40 bg-red-500/15 text-red-300",
  },
  postergado: {
    texto: "POSTERGADO",
    clases:
      "border-slate-500/40 bg-slate-500/15 text-slate-300",
  },
};

export default function StatusBadge({
  status,
}: Props) {
  const configuracion = estilos[status];

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${configuracion.clases}`}
    >
      {configuracion.texto}
    </span>
  );
}