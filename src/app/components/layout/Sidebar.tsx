"use client";
type SidebarProps = {
  ligaSeleccionada: string;
  onSeleccionarLiga: (liga: string) => void;
};

export default function Sidebar({
  ligaSeleccionada,
  onSeleccionarLiga,
}: SidebarProps) {
  return (
    <aside className="bg-green-950 rounded-xl p-5 h-fit">
      <h2 className="text-2xl font-bold mb-5 text-white">
        🏆 Ligas
      </h2>

      <ul className="space-y-3">

        <li
          onClick={() => onSeleccionarLiga("Catamarqueña")}
          className={`cursor-pointer p-2 rounded ${
            ligaSeleccionada === "Catamarqueña"
              ? "bg-green-700"
              : "hover:bg-green-800"
          }`}
        >
          Liga Catamarqueña
        </li>

        <li
          onClick={() => onSeleccionarLiga("Chacarera")}
          className={`cursor-pointer p-2 rounded ${
            ligaSeleccionada === "Chacarera"
              ? "bg-green-700"
              : "hover:bg-green-800"
          }`}
        >
          Liga Chacarera
        </li>

      </ul>
    </aside>
  );
}