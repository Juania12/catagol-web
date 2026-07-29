type Props = {
  etiqueta: string;
  valor: string | number;
  descripcion: string;
  destacado?: boolean;
};

export default function AdminStat({
  etiqueta,
  valor,
  descripcion,
  destacado = true,
}: Props) {
  return (
    <article className="rounded-3xl border border-[#33462b] bg-[#142318] p-6">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#879783]">
        {etiqueta}
      </p>

      <p
        className={`mt-4 font-black ${
          destacado
            ? "text-4xl text-[#D6B46A]"
            : "text-2xl text-green-300"
        }`}
      >
        {valor}
      </p>

      <p className="mt-2 text-sm text-[#aab6a5]">
        {descripcion}
      </p>
    </article>
  );
}