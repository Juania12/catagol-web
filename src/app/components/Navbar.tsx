"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  {
    nombre: "Inicio",
    href: "/",
    icono: "🏠",
  },
  {
    nombre: "Resultados",
    href: "/resultados",
    icono: "⚽",
  },
  {
    nombre: "Fixture",
    href: "/fixture",
    icono: "📅",
  },
  {
    nombre: "Posiciones",
    href: "/posiciones",
    icono: "📊",
  },
  {
    nombre: "Equipos",
    href: "/equipos",
    icono: "🏆",
  },
  {
    nombre: "Noticias",
    href: "/noticias",
    icono: "📰",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 border-b border-slate-700">

      <div className="max-w-7xl mx-auto">

        <ul className="flex items-center justify-center gap-3 py-3 flex-wrap">

          {links.map((link) => (

            <li key={link.href}>

              <Link
                href={link.href}
                className={`px-5 py-2 rounded-xl transition font-semibold flex items-center gap-2 ${
                  pathname === link.href
                    ? "bg-yellow-400 text-slate-900"
                    : "text-white hover:bg-slate-700"
                }`}
              >
                <span>{link.icono}</span>

                {link.nombre}
              </Link>

            </li>

          ))}

        </ul>

      </div>

    </nav>
  );
}