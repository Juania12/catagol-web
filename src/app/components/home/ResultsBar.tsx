import Link from "next/link";
import { partidos } from "../../data/partidos";

export default function ResultsBar() {
  return (
    <section className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6 overflow-x-auto whitespace-nowrap">

        <span className="text-[#D6B46A] font-bold">
          RESULTADOS
        </span>

        {partidos.map((partido) => (
          <Link
            key={partido.id}
            href={`/partidos/${partido.id}`}
            className="hover:text-[#D6B46A] transition"
          >
            <span className="font-semibold">
              {partido.local}
            </span>

            <span className="mx-2 text-[#D6B46A] font-bold">
              {partido.golesLocal}-{partido.golesVisitante}
            </span>

            <span className="font-semibold">
              {partido.visitante}
            </span>
          </Link>
        ))}

      </div>
    </section>
  );
}