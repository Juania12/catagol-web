"use client";

import { useState } from "react";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import StatsBar from "./components/StatsBar";
import LeagueTabs from "./components/LeagueTabs";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import MatchCard from "./components/MatchCard";
import FeaturedMatch from "./components/FeaturedMatch";
import NextMatchCard from "./components/NextMatchCard";
import Fixture from "./components/Fixture";
import Table from "./components/Table";
import NewsCard from "./components/NewsCard";
import Footer from "./components/Footer";

import { partidos } from "./data/partidos";
import { proximos } from "./data/proximos";
import { noticias } from "./data/noticias";

export default function Home() {
  const [ligaSeleccionada, setLigaSeleccionada] =
    useState("Catamarqueña");

  const [busqueda, setBusqueda] = useState("");

  const partidosFiltrados = partidos.filter((partido) => {
    const coincideLiga = partido.liga === ligaSeleccionada;

    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      partido.local.toLowerCase().includes(texto) ||
      partido.visitante.toLowerCase().includes(texto);

    return coincideLiga && coincideBusqueda;
  });

  return (
    <main className="min-h-screen bg-green-800 text-white">
      <Header />
      <Navbar />

      <section className="max-w-7xl mx-auto p-6">

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
                key={partido.local + partido.visitante}
                local={partido.local}
                visitante={partido.visitante}
                golesLocal={partido.golesLocal}
                golesVisitante={partido.golesVisitante}
                fecha={partido.fecha}
                estadio={partido.estadio}
              />
            ))}

            <FeaturedMatch />

            <h2 className="text-3xl font-bold mt-10 mb-5">
              📅 Próximos Partidos
            </h2>

            {proximos
              .filter((partido) => partido.liga === ligaSeleccionada)
              .map((partido) => (
                <NextMatchCard
                  key={partido.local + partido.visitante}
                  local={partido.local}
                  visitante={partido.visitante}
                  fecha={partido.fecha}
                  hora={partido.hora}
                  estadio={partido.estadio}
                />
              ))}

            <Fixture />

            <h2 className="text-3xl font-bold mt-10 mb-5">
              📰 Últimas Noticias
            </h2>

            <div className="space-y-5">
              {noticias.map((noticia) => (
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
            <Table />
          </div>

        </div>

      </section>

      <Footer />
    </main>
  );
}