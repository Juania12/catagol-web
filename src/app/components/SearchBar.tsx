"use client";

type SearchBarProps = {
  busqueda: string;
  setBusqueda: (texto: string) => void;
};

export default function SearchBar({
  busqueda,
  setBusqueda,
}: SearchBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
      <input
        type="text"
        placeholder="🔍 Buscar equipo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full p-3 rounded-xl border-2 border-green-700 outline-none focus:ring-2 focus:ring-green-500 text-black"
      />
    </div>
  );
}