import Image from "next/image";
import { tabla } from "../data/tabla";
import { equipos } from "../data/equipos";

export default function Table() {
  return (
    <div className="bg-white text-black rounded-2xl shadow-xl p-5">

      <h2 className="text-2xl font-bold text-center mb-5">
        📊 Tabla de Posiciones
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

          {tabla.map((equipo) => (

            <tr
              key={equipo.equipo}
              className="border-b hover:bg-gray-100 transition"
            >

              <td className="text-center font-bold">

                {equipo.posicion === 1 && "🥇"}
                {equipo.posicion === 2 && "🥈"}
                {equipo.posicion === 3 && "🥉"}

                {equipo.posicion > 3 && equipo.posicion}

              </td>

              <td className="py-3">

                <div className="flex items-center gap-3">

                  <Image
                    src={equipos[equipo.equipo as keyof typeof equipos].escudo}
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

                {equipo.dg > 0
                  ? `+${equipo.dg}`
                  : equipo.dg}

              </td>

              <td className="text-center font-bold text-green-700">
                {equipo.pts}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}