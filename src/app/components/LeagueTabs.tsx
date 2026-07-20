type Props = {
  ligaSeleccionada: string;
  onCambiarLiga: (liga: string) => void;
};

export default function LeagueTabs({
  ligaSeleccionada,
  onCambiarLiga,
}: Props) {
  return (
    <div className="flex gap-4 mb-6">

      <button
        onClick={() => onCambiarLiga("Catamarqueña")}
        className={`px-5 py-3 rounded-xl font-bold transition ${
          ligaSeleccionada === "Catamarqueña"
            ? "bg-yellow-400 text-black"
            : "bg-green-950 text-white hover:bg-green-900"
        }`}
      >
        🏆 Liga Catamarqueña
      </button>

      <button
        onClick={() => onCambiarLiga("Chacarera")}
        className={`px-5 py-3 rounded-xl font-bold transition ${
          ligaSeleccionada === "Chacarera"
            ? "bg-yellow-400 text-black"
            : "bg-green-950 text-white hover:bg-green-900"
        }`}
      >
        🏆 Liga Chacarera
      </button>

    </div>
  );
}