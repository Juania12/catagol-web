"use client";

import { useState } from "react";

import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import StatsBar from "./components/table/StatsBar";
import LeagueTabs from "./components/ui/LeagueTabs";
import Sidebar from "./components/layout/Sidebar";
import SearchBar from "./components/ui/SearchBar";
import MatchCard from "./components/matches/MatchCard";
import HomeHero from "./components/home/hero/HomeHero";
import NextMatchCard from "./components/matches/NextMatchCard";
import Fixture from "./components/matches/Fixture";
import Table from "./components/table/Table";
import NewsCard from "./components/news/NewsCard";
import Footer from "./components/layout/Footer";
import ResultsBar from "./components/home/ResultsBar";

import { obtenerPartidosPorLiga } from "./lib/obtenerPartidos";
import { obtenerProximosPorLiga } from "./lib/obtenerProximos";
import { obtenerNoticias } from "./lib/obtenerNoticias";

export default function Home() {
  const [ligaSeleccionada, setLigaSeleccionada] =
    useState("Catamarqueña");

  const [busqueda, setBusqueda] = useState("");

  const partidosFiltrados = obtenerPartidosPorLiga(
    ligaSeleccionada
  ).filter((partido) => {
    const texto = busqueda.toLowerCase();

    return (
      partido.local.toLowerCase().includes(texto) ||
      partido.visitante.toLowerCase().includes(texto)
    );
  });

  return (
    <main className="min-h-screen bg-green-800 text-white">
      <Header />
<ResultsBar />


      <section className="max-w-7xl mx-auto p-6">

        <HomeHero />

        <StatsBar />

        <LeagueTabs
          ligaSeleccionada={ligaSeleccionada}
          onCambiarLiga={setLigaSeleccionada}
        />

        <div className="grid grid-cols-4 gap-6">

          {/* Sidebar */}
          <div>
            <Sidebar
              ligaSeleccionada={ligaSeleccionada}
              onSeleccionarLiga={setLigaSeleccionada}
            />
          </div>

          {/* Contenido principal */}
          <div className="col-span-2">

            <SearchBar
              busqueda={busqueda}
              setBusqueda={setBusqueda}
            />

            <h2 className="text-3xl font-bold mb-5">
              ⚽ {ligaSeleccionada}
            </h2>

           {partidosFiltrados.map((partido) => (
  <MatchCard
    key={partido.id}
    id={partido.id}
    local={partido.local}
    visitante={partido.visitante}
    golesLocal={partido.golesLocal}
    golesVisitante={partido.golesVisitante}
    fecha={partido.fecha}
    estadio={partido.estadio}
  />
))}

            <h2 className="text-3xl font-bold mt-10 mb-5">
              📅 Próximos Partidos
            </h2>

            {partidosFiltrados.map((partido) => (
  <MatchCard
    key={partido.id}
    id={partido.id}
    local={partido.local}
    visitante={partido.visitante}
    golesLocal={partido.golesLocal}
    golesVisitante={partido.golesVisitante}
    fecha={partido.fecha}
    estadio={partido.estadio}
  />
))}

            <Fixture />

            <h2 className="text-3xl font-bold mt-10 mb-5">
              📰 Últimas Noticias
            </h2>

            <div className="space-y-5">
              {obtenerNoticias().map((noticia) => (
                <NewsCard
                  key={noticia.titulo}
                  titulo={noticia.titulo}
                  descripcion={noticia.descripcion}
                  imagen={noticia.imagen}
                />
              ))}
            </div>

          </div>

          {/* Tabla */}
          <div>
            <Table liga={ligaSeleccionada} />
          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}