import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 shadow-xl">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-4">

          <Image
            src="/escudos/catagol.png"
            alt="CATAGOL"
            width={65}
            height={65}
            priority
          />

          <div>

            <h1 className="text-4xl font-black tracking-wide text-white">
              CATAGOL
            </h1>

            <p className="text-slate-300 text-sm">
              El fútbol de Catamarca en un solo lugar
            </p>

          </div>

        </div>

        {/* Barra derecha */}
        <div className="flex items-center gap-4">

          {/* Buscador */}
          <input
            type="text"
            placeholder="Buscar equipo..."
            className="hidden lg:block w-72 px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
          />

          {/* Botón */}
          <button className="bg-yellow-400 hover:bg-yellow-500 transition px-5 py-2 rounded-xl font-bold text-slate-900">
            Iniciar sesión
          </button>

        </div>

      </div>

    </header>
  );
}