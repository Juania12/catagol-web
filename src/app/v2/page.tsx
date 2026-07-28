import Header from "../components/layout/Header";
import ResultsBar from "../components/home/ResultsBar";
import HomeHero from "../components/home/hero/HomeHero";
import Footer from "../components/layout/Footer";

export default function HomeV2() {
  return (
    <main className="min-h-screen bg-slate-950 text-[#F5F1E8]">
      <Header />

      <ResultsBar />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <HomeHero />

        <section className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
            <h2 className="text-2xl font-black">
              Últimos resultados
            </h2>

            <p className="mt-3 text-slate-400">
              Acá vamos a colocar las nuevas tarjetas de partidos.
            </p>
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-2xl font-black">
                Tabla de posiciones
              </h2>

              <p className="mt-3 text-slate-400">
                Acá irá la tabla compacta.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-2xl font-black">
                Próximos partidos
              </h2>

              <p className="mt-3 text-slate-400">
                Acá mostraremos la próxima fecha.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">
            Noticias destacadas
          </h2>

          <p className="mt-3 text-slate-400">
            Acá construiremos la grilla de noticias del mockup.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}