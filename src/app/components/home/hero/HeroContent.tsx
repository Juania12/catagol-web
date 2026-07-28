import Image from "next/image";

import Badge from "../../ui/Badge";
import Button from "../../ui/Button";

type Props = {
  liga: string;
  estado: string;
  local: string;
  visitante: string;
  escudoLocal: string;
  escudoVisitante: string;
  resultado: string;
  estadio: string;
  partidoId: string;
};

export default function HeroContent({
  liga,
  estado,
  local,
  visitante,
  escudoLocal,
  escudoVisitante,
  resultado,
  estadio,
  partidoId,
}: Props) {
  return (
    <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
      <div className="flex items-center justify-between gap-4">
        <Badge variant="catamarquena">
          {liga}
        </Badge>

        <Badge variant="final">
          {estado}
        </Badge>
      </div>

      <div className="text-center">
        <div className="grid grid-cols-3 items-center gap-4 md:gap-8">
          <div className="flex flex-col items-center">
            <Image
              src={escudoLocal}
              alt={local}
              width={140}
              height={140}
              className="h-24 w-24 object-contain drop-shadow-2xl md:h-36 md:w-36"
              priority
            />

            <h2 className="mt-4 text-center text-base font-black text-[#F5F1E8] md:text-2xl">
              {local}
            </h2>
          </div>

          <div>
            <p className="text-4xl font-black tracking-wider text-[#D6B46A] md:text-7xl">
              {resultado}
            </p>

            <div className="mx-auto mt-5 h-[2px] w-20 rounded-full bg-[#D6B46A] md:w-28" />

            <p className="mt-5 text-xs text-slate-300 md:text-sm">
              {estadio}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src={escudoVisitante}
              alt={visitante}
              width={140}
              height={140}
              className="h-24 w-24 object-contain drop-shadow-2xl md:h-36 md:w-36"
              priority
            />

            <h2 className="mt-4 text-center text-base font-black text-[#F5F1E8] md:text-2xl">
              {visitante}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button href={`/partidos/${partidoId}`}>
          Ver Match Center →
        </Button>
      </div>
    </div>
  );
}