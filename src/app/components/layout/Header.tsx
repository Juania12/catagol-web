"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "../ui/Container";
import Button from "../ui/Button";

const links = [
  { nombre: "Inicio", href: "/" },
  { nombre: "Resultados", href: "/resultados" },
  { nombre: "Equipos", href: "/equipos" },
  { nombre: "Posiciones", href: "/posiciones" },
  { nombre: "Fixture", href: "/fixture" },
  { nombre: "Noticias", href: "/noticias" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950/95 backdrop-blur">

      <Container>
        <div className="flex min-h-20 items-center justify-between gap-6">

          {/* Marca */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/escudos/catagol.png"
              alt="CATAGOL"
              width={58}
              height={58}
              priority
              className="object-contain"
            />

            <div className="hidden sm:block">
              <p className="text-2xl font-black tracking-wide text-[#F5F1E8]">
                CATAGOL
              </p>

              <p className="text-xs font-medium text-slate-400">
                El fútbol de Catamarca
              </p>
            </div>
          </Link>

          {/* Navegación de escritorio */}

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const activo =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                    activo
                      ? "bg-[#D6B46A] text-slate-950"
                      : "text-slate-300 hover:bg-slate-800 hover:text-[#F5F1E8]"
                  }`}
                >
                  {link.nombre}
                </Link>
              );
            })}
          </nav>

          {/* Acciones */}

          <div className="flex items-center gap-3">

            <button
              type="button"
              aria-label="Buscar"
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-[#D6B46A] hover:text-[#D6B46A]"
            >
              <span className="text-lg">⌕</span>
            </button>

            <Button
              href="/login"
              variant="primary"
              className="hidden sm:inline-flex"
            >
              Mi cuenta
            </Button>

          </div>

        </div>

        {/* Navegación para celular */}

        <nav className="flex gap-2 overflow-x-auto pb-3 lg:hidden">
          {links.map((link) => {
            const activo =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${
                  activo
                    ? "bg-[#D6B46A] text-slate-950"
                    : "bg-slate-900 text-slate-300"
                }`}
              >
                {link.nombre}
              </Link>
            );
          })}
        </nav>

      </Container>

      {/* Acento Catamarqueña provisional */}

      <div className="h-1 bg-[#3F6B3C]" />

    </header>
  );
}