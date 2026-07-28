import Header from "../components/layout/Header";
import ResultsBar from "../components/home/ResultsBar";
import Hero from "../components/home/hero/Hero";
import Footer from "../components/layout/Footer";
import MatchdayCenter from "../components/home/MatchdayCenter";
import HomeSidebar from "../components/home/HomeSidebar";
import PremiumNews from "../components/home/PremiumNews";

export default function HomeV2() {
  return (
    <main className="min-h-screen bg-slate-950 text-[#F5F1E8]">
      <Header />

      <ResultsBar />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
       <Hero />

        <section className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MatchdayCenter />
          </div>

          <aside className="space-y-8">
            <HomeSidebar />
            <PremiumNews />
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