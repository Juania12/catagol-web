export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

      <div className="bg-green-950 rounded-2xl p-5 text-center shadow-lg">
        <p className="text-4xl font-bold text-yellow-400">24</p>
        <p className="text-green-200">Partidos</p>
      </div>

      <div className="bg-green-950 rounded-2xl p-5 text-center shadow-lg">
        <p className="text-4xl font-bold text-yellow-400">18</p>
        <p className="text-green-200">Equipos</p>
      </div>

      <div className="bg-green-950 rounded-2xl p-5 text-center shadow-lg">
        <p className="text-4xl font-bold text-yellow-400">67</p>
        <p className="text-green-200">Goles</p>
      </div>

      <div className="bg-green-950 rounded-2xl p-5 text-center shadow-lg">
        <p className="text-4xl font-bold text-yellow-400">2</p>
        <p className="text-green-200">Ligas</p>
      </div>

    </div>
  );
}