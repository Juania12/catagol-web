type Props = {
  titulo?: string;
  children: React.ReactNode;
};

export default function AdminNotice({
  titulo = "Modo local",
  children,
}: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-[#4f673c] bg-[#101d14] p-5">
      <p className="text-xs font-black uppercase tracking-wide text-[#D6B46A]">
        {titulo}
      </p>

      <div className="mt-2 text-sm leading-6 text-[#879783]">
        {children}
      </div>
    </div>
  );
}