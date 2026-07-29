type Props = {
  etiqueta?: string;
  titulo: string;
  descripcion?: string;
  children: React.ReactNode;
  className?: string;
};

export default function AdminSection({
  etiqueta,
  titulo,
  descripcion,
  children,
  className = "",
}: Props) {
  return (
    <section className={`mt-8 ${className}`}>
      <div className="mb-6">
        {etiqueta && (
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D6B46A]">
            {etiqueta}
          </p>
        )}

        <h2 className="mt-2 text-2xl font-black">
          {titulo}
        </h2>

        {descripcion && (
          <p className="mt-2 text-sm leading-6 text-[#879783]">
            {descripcion}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}