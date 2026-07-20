type Props = {
  local: string;
  visitante: string;
  fecha: string;
  hora: string;
  estadio: string;
};

export default function NextMatchCard({
  local,
  visitante,
  fecha,
  hora,
  estadio,
}: Props) {
  return (
    <div className="bg-green-950 rounded-xl p-5 mb-4 shadow">

      <div className="flex justify-between items-center">

        <h3 className="font-bold text-lg">{local}</h3>

        <span className="font-bold text-yellow-400">
          VS
        </span>

        <h3 className="font-bold text-lg">{visitante}</h3>

      </div>

      <div className="mt-3 text-green-200 text-sm">
        <p>📅 {fecha}</p>
        <p>🕓 {hora}</p>
        <p>🏟️ {estadio}</p>
      </div>

    </div>
  );
}