import Link from "next/link";

type Props = {
  etiqueta: string;
  titulo: string;
  descripcion?: string;
  volverHref?: string;
  volverTexto?: string;
  accionHref?: string;
  accionTexto?: string;
};

export default function AdminHeader({
  etiqueta,
  titulo,
  descripcion,
  volverHref = "/admin",
  volverTexto = "Volver al panel",
  accionHref,
  accionTexto,
}: Props) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Link
          href={volverHref}
          className="text-sm font-black text-[#D6B46A] transition hover:text-[#ead292]"
        >
          ← {volverTexto}
        </Link>

        <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
          {etiqueta}
        </p>

        <h1 className="mt-2 text-4xl font-black md:text-5xl">
          {titulo}
        </h1>

        {descripcion && (
          <p className="mt-3 max-w-2xl text-[#aab6a5]">
            {descripcion}
          </p>
        )}
      </div>

      {accionHref && accionTexto && (
        <Link
          href={accionHref}
          className="rounded-xl bg-[#D6B46A] px-5 py-3 text-center font-black text-[#142318] transition hover:bg-[#ead292]"
        >
          {accionTexto}
        </Link>
      )}
    </div>
  );
}