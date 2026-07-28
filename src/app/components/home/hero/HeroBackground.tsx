import Image from "next/image";

type Props = {
  imagen?: string;
};

export default function HeroBackground({ imagen }: Props) {
  return (
    <>
      {imagen ? (
        <Image
          src={imagen}
          alt=""
          fill
          priority
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3F6B3C] via-slate-950 to-[#A65E2E]" />
      )}

      {/* Oscurece la imagen para que el texto se lea bien */}

      <div className="absolute inset-0 bg-slate-950/55" />

      {/* Degradado inferior */}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/35" />

      {/* Toques cálidos inspirados en Catamarca */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#3F6B3C]/20 via-transparent to-[#A65E2E]/20" />
    </>
  );
}