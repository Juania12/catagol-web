import Image from "next/image";
import { calcularTabla } from "../../lib/calcularTabla";
import { equipos } from "../../data/equipos";

type Props = {
  liga: string;
};

export default function Table({ liga }: Props) {
  const tabla = calcularTabla(liga);
  console.log("Liga:", liga);
console.log("Tabla:", tabla);
return (
    <div className="bg-white text-black rounded-2xl shadow-xl p-5">
      <h2 className="text-2xl font-bold text-center mb-5">
        📊 Tabla actual: {liga}
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b-2 text-gray-600 text-sm">
            <th className="py-3">#</th>
            <th className="text-left">Equipo</th>
            <th>PJ</th>
            <th>DG</th>
            <th>PTS</th>
          </tr>
        </thead>

        <tbody>
          {tabla.map((equipo, index) => {
            const datosEquipo =
              equipos[equipo.equipo as keyof typeof equipos];

            if (!datosEquipo) return null;

            return (
              <tr
                key={equipo.equipo}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="text-center font-bold">
                  {index === 0 && "🥇"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  {index > 2 && index + 1}
                </td>

                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={datosEquipo.escudo}
                      alt={equipo.equipo}
                      width={30}
                      height={30}
                    />

                    <span className="font-semibold">
                      {equipo.equipo}
                    </span>
                  </div>
                </td>

                <td className="text-center">
                  {equipo.pj}
                </td>

                <td className="text-center">
                  {equipo.dg > 0 ? `+${equipo.dg}` : equipo.dg}
                </td>

                <td className="text-center font-bold text-green-700">
                  {equipo.pts}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}