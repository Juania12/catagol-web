import { fixture } from "../../data/fixture";

export default function Fixture() {
  return (
    <div className="bg-white text-black rounded-2xl shadow-xl p-6 mt-10">

      <h2 className="text-3xl font-bold mb-6">
        📅 Fixture
      </h2>

      {fixture.map((fecha) => (

        <div key={fecha.fecha} className="mb-8">

          <h3 className="text-xl font-bold mb-4 text-green-700">
            {fecha.fecha}
          </h3>

          {fecha.partidos.map((partido) => (

            <div
              key={partido.local + partido.visitante}
              className="flex justify-between border-b py-3"
            >

              <span>
                {partido.local} vs {partido.visitante}
              </span>

              <span>
                {partido.dia} - {partido.hora}
              </span>

            </div>

          ))}

        </div>

      ))}

    </div>
  );
}